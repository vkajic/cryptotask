pragma solidity ^0.4.18;

import "SafeMath.sol";
import "Ownable.sol";
import "ERC20Basic.sol";
import "ERC20.sol";


/**
 * @title Basic token
 * @dev Basic version of StandardToken, with no allowances.
 */
contract BasicToken is ERC20Basic, Ownable {
  using SafeMath for uint256;

  mapping(address => uint256) balances;
  mapping(address => bool) locks;

  /**
  * @dev transfer token for a specified address
  * @param _to The address to transfer to.
  * @param _value The amount to be transferred.
  */
  function transfer(address _to, uint256 _value) public returns (bool) {
    require(_to != address(0));
    
    require(!locks[msg.sender] && !locks[_to]);

    // SafeMath.sub will throw if there is not enough balance.
    balances[msg.sender] = balances[msg.sender].sub(_value);
    balances[_to] = balances[_to].add(_value);
    Transfer(msg.sender, _to, _value);
    return true;
  }

  /**
  * @dev Gets the balance of the specified address.
  * @param _owner The address to query the the balance of.
  * @return An uint256 representing the amount owned by the passed address.
  */
  function balanceOf(address _owner) public constant returns (uint256 balance) {
    return balances[_owner];
  }
  
  /**
  * @dev Sets the lock state of the specified address.
  * @param _toLock The address to set the the lock state for.
  * @param _setTo A bool representing the lock state.
  */
  function setLock(address _toLock, bool _setTo) onlyOwner {
      locks[_toLock] = _setTo;
  }

  /**
  * @dev Gets the lock state of the specified address.
  * @param _owner The address to query the the lock state of.
  * @return A bool representing the lock state.
  */
  function lockOf(address _owner) public constant returns (bool lock) {
    return locks[_owner];
  }

}
