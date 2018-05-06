"use strict";

var TiwitterItem = function(text) {
	if (text) {
		var obj = JSON.parse(text);
		this.key = obj.key;//timestamp
		this.value = obj.value;
		this.author = obj.author;
	} else {
	    this.key = "";
	    this.author = "";
	    this.value = "";
	}
};

TiwitterItem.prototype = {
	toString: function () {
		return JSON.stringify(this);
	}
};

var SimpleTwitter = function () {
    LocalContractStorage.defineMapProperty(this, "repo", {
        parse: function (text) {
            return new TiwitterItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

SimpleTwitter.prototype = {
    init: function () {
        // todo
    },

    save: function (key, value) {

        key = key.trim();
        value = value.trim();
        if (key === "" || value === ""){
            throw new Error("empty key / value");
        }
        if (value.length > 64 || key.length > 64){
            throw new Error("key / value exceed limit length")
        }

        var from = Blockchain.transaction.from;
        var dictItem = this.repo.get(key);
        if (dictItem){
            throw new Error("value has been occupied");
        }

        dictItem = new TiwitterItem();
        dictItem.author = from;
        dictItem.key = key;
        dictItem.value = value;

        this.repo.put(key, dictItem);
    },

    get: function (key) {
        if ( key === -1 ) {
            throw this.repo;
        }
        key = key.trim();
        if ( key === "" ) {
            throw new Error("empty key");
        }
        return this.repo.get(key);
    }

};
module.exports = SimpleTwitter;