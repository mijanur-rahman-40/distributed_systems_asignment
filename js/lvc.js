// lamport's vector clock imaplementation

var LVC = function() {
    this.clock = {};
    }

LVC.prototype.increment = function(id) {
    if (this.clock[id] == undefined) {
        this.clock[id] = 0;
        }
    this.clock[id] += 1;
    }

LVC.prototype.merge = function(other) {
    for (var id in other.clock) {
        if (this.clock[id] == undefined) {
            this.clock[id] = other.clock[id];
            }
        else {
            this.clock[id] = Math.max(this.clock[id], other.clock[id]);
            }
        }
    }

LVC.prototype.compare = function(other) {
    var result = 0;
    for (var id in this.clock) {
        if (other.clock[id] == undefined) {
            result = 1;
            }
        else {
            result = Math.max(result, this.clock[id] - other.clock[id]);
            }
        }
    for (var id in other.clock) {
        if (this.clock[id] == undefined) {
            result = -1;
            }
        }
    return result;
    }

LVC.prototype.toString = function() {
    var result = [];
    for (var id in this.clock) {
        result.push(id + ":" + this.clock[id]);
        }
    return result.join(", ");
    }

LVC.prototype.clone = function() {

    var result = new LVC();
    for (var id in this.clock) {
        result.clock[id] = this.clock[id];
        }
    return result;
    }

LVC.prototype.equals = function(other) {
    if (this.clock.length != other.clock.length) {
        return false;
        }
    for (var id in this.clock) {
        if (this.clock[id] != other.clock[id]) {
            return false;
            }
        }
    return true;
    }

LVC.prototype.isConcurrent = function(other) {
    return this.compare(other) != 0;
    }

LVC.prototype.isBefore = function(other) {
    return this.compare(other) < 0;
    }

LVC.prototype.isAfter = function(other) {
    return this.compare(other) > 0;
    }

LVC.prototype.isBeforeOrConcurrent = function(other) {
    return this.compare(other) <= 0;
    }

LVC.prototype.isAfterOrConcurrent = function(other) {
    return this.compare(other) >= 0;
    }

LVC.prototype.isConcurrentWith = function(other) {
    return this.isConcurrent(other);
    }

LVC.prototype.isBefore = function(other) {
    return this.isBefore(other);
    }

LVC.prototype.isAfter = function(other) {
    return this.isAfter(other);
    }

LVC.prototype.isBeforeOrConcurrentWith = function(other) {
    return this.isBeforeOrConcurrent(other);
    }
