pragma solidity ^0.4.16;

contract Crowdsale is Ownable {
    using SafeMath for uint;
    
    uint public fundingGoal = 2 * 1 ether;   //1000 * 1 ether;
    uint public hardCap;
    uint public amountRaisedPreSale = 0;
    uint public amountRaisedICO = 0;
    //period between pre-sale and ICO
    uint countdownInMinutes = 10;   //7200
    //ICO duration in minutes
    uint durationInMinutes = 15; //10000;
    uint public presaleEndTime;
    uint public deadline;
    uint public price = (1 ether)/1000;
    MintableToken public token;
    mapping(address => uint) public balanceOf;
    bool public icoSuccess = false;
    bool public crowdsaleClosed = false;
    //2 vaults that the raised funds are forwarded to
    address vault1;
    address vault2 = 0x;	//add address here
    //stage 0 - presale, 1 - ICO, 2 - ICO success, 3 - after 1st vote on continuation of the project, 4 - after 2nd vote. ICO funds released in 3 stages
    uint public stage = 0;
    //total token stake against the project continuation
    uint public against = 0;
    uint public lastVoteTime;
    uint minVoteTimeInMinutes = 20; //262800

    event GoalReached(uint amountRaised);
    event FundTransfer(address backer, uint amount, bool isContribution);

    /**
     * Constrctor function
     *
     * Setup the owner
     */
    function Crowdsale() {
        vault1 = msg.sender;
        token = new MintableToken();
    }

    /**
     * Fallback function
     *
     * Called whenever anyone sends funds to the contract
     */
    function () payable {
        require(!token.lockOf(msg.sender) && !crowdsaleClosed && stage<2 && msg.value >= 1 * (1 ether)/10);
        if(stage==1 && (now.sub(presaleEndTime) < countdownInMinutes * 1 minutes || amountRaisedPreSale+amountRaisedICO+msg.value > hardCap)) {
            throw;
        }
        uint amount = msg.value;
        balanceOf[msg.sender] += amount;
        if(stage==0) {  //presale
            //amountRaisedPreSale += amount;
            //token.mint(msg.sender, amount.mul(2) / price);
        } else {
            amountRaisedICO += amount;
            token.mint(msg.sender, amount / price);
        }
        FundTransfer(msg.sender, amount, true);
    }
    
    /**
     * Forwards the amount from the contract to the vaults, 70% of the amount to vault1 and 30% to vault2
     */
    function forward(uint amount) internal {
        vault1.transfer(amount.mul(7)/10);
        vault2.transfer(amount-amount.mul(7)/10);
    }

    modifier afterDeadline() { if (stage > 0 && now >= deadline) _; }

    /**
     * Check after deadline if the goal was reached and ends the campaign
     */
    function checkGoalReached() afterDeadline {
        require(stage==1 && !crowdsaleClosed);
        if (amountRaisedPreSale+amountRaisedICO >= fundingGoal) {
            uint amount = amountRaisedICO/3;
            uint amountToken1 = token.totalSupply().mul(7)/(10*4);
            uint amountToken2 = token.totalSupply().mul(3)/(10*4);
            forward(amount);
            icoSuccess = true;
            token.mint(vault1, amountToken1);    //70% of the 25% of the total
            token.mint(vault2, amountToken2);    //30% of the 25% of the total
            stage=2;
            lastVoteTime = now;
            GoalReached(amountRaisedPreSale+amountRaisedICO);
        }
        crowdsaleClosed = true;
        token.finishMinting();
    }

    /**
     * Closes presale
     */
    function closePresale() onlyOwner {
        require(stage==0);
        stage = 1;
        presaleEndTime = now;
        deadline = now + (durationInMinutes + countdownInMinutes) * 1 minutes;
        if(amountRaisedPreSale.mul(3) > 10000 * 1 ether) {
            hardCap = amountRaisedPreSale.mul(3);
        } else {
            hardCap = 10000 * 1 ether;
        }
    }

    /**
     * Withdraw the funds
     *
     * If goal was not reached, each contributor can withdraw the amount they contributed, or less in case project is stopped through voting in later stages.
     */
    function safeWithdrawal() {
        require(crowdsaleClosed && !icoSuccess);
        
        uint amount;
        if(stage==1) {
            amount = balanceOf[msg.sender];
        } else if(stage==2) {
            amount = balanceOf[msg.sender].mul(2)/3;    //2 thirds of the initial deposit can be withdrawn
        } else if(stage==3) {
            amount = balanceOf[msg.sender]/3;    //one third of the initial deposit can be withdrawn
        }
        balanceOf[msg.sender] = 0;
        if (amount > 0) {
            msg.sender.transfer(amount);
            FundTransfer(msg.sender, amount, false);
        }
    }
    
    /**
     * Token stakeholder can vote against the project continuation. Tokens are locked until voteRelease() is called
     */
    function voteAgainst()
    {
        require((stage==2 || stage==3) && !token.lockOf(msg.sender));   // If has already voted, cancel
        token.setLock(msg.sender, true);
        uint voteWeight = token.balanceOf(msg.sender);
        against = against.add(voteWeight);
    }
    
    /**
     * Token stakeholder can release the against-vote, and unlock the tokens
     */
    function voteRelease()
    {
        require((stage==2 || stage==3 || stage==4) && token.lockOf(msg.sender));
        token.setLock(msg.sender, false);
        uint voteWeight = token.balanceOf(msg.sender);
        against = against.sub(voteWeight);
    }
    
    /**
     * After each voting period, vote stakes can be counted, and in case that more than 50% of token stake is against the continuation,
     * the remaining eth balances can be withdrawn proportionally
     */
    function countVotes()
    {
        require(icoSuccess && (stage==2 || stage==3) && now-lastVoteTime > minVoteTimeInMinutes * 1 minutes);
        lastVoteTime = now;
        
        if(against > token.totalSupply()/2) {
            icoSuccess = false;
        } else {
            uint amount = amountRaisedICO/3;
            forward(amount);
            stage++;
        }
    }
    
    /**
     * Contract owner can accept presale deposit, eth gets forwarded to vaults and investor gets freshly minted tokens
     */
    function accept(address investor) onlyOwner {
        require(stage==0  || (stage == 1 && now.sub(presaleEndTime) < countdownInMinutes * 1 minutes));
        uint amount = balanceOf[investor];
        balanceOf[investor] = 0;
        amountRaisedPreSale += amount;
        forward(amount);
        token.mint(investor, amount.mul(2) / price);
    }
    
    /**
     * Contract owner can reject presale deposit and eth is returned to the investor
     */
    function reject(address investor) onlyOwner {
        require(stage == 0 || (stage == 1 && now.sub(presaleEndTime) < countdownInMinutes * 1 minutes));
        uint amount = balanceOf[investor];
        balanceOf[investor] = 0;
        if (amount > 0) {
            investor.transfer(amount);
            FundTransfer(investor, amount, false);
        }
    }
    
}