// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

abstract contract Console is Context {
    using Counters for Counters.Counter;
    Counters.Counter private _eventIdCounter;

    enum Types {
        INFO,
        ERROR
    }

    event EventCreated(uint256 id, Types indexed eventType, string message);

    function _log(string memory message) internal virtual {
        _emitEvent(Types.INFO, message);
    }

    function _logError(string memory message) internal virtual {
        _emitEvent(Types.ERROR, message);
    }

    function _emitEvent(Types eventType, string memory message) private {
        uint256 eventId = _eventIdCounter.current();
        emit EventCreated(eventId, eventType, message);
        _eventIdCounter.increment();
    }
}
