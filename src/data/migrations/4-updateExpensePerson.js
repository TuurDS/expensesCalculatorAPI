'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "percentage" from table "expensePerson"
 * removeColumn "amount" from table "expensePerson"
 * addColumn "value" to table "expensePerson"
 *
 **/

var info = {
    "revision": 4,
    "name": "updateExpensePerson",
    "created": "2023-01-06T00:08:53.902Z",
    "comment": ""
};

var migrationCommands = function (transaction) {
    return [{
        fn: "removeColumn",
        params: [
            "expensePerson",
            "percentage",
            {
                transaction: transaction
            }
        ]
    },
    {
        fn: "removeColumn",
        params: [
            "expensePerson",
            "amount",
            {
                transaction: transaction
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "expensePerson",
            "value",
            {
                "type": Sequelize.DOUBLE,
                "field": "value",
                "allowNull": true
            },
            {
                transaction: transaction
            }
        ]
    }
    ];
};
var rollbackCommands = function (transaction) {
    return [{
        fn: "removeColumn",
        params: [
            "expensePerson",
            "value",
            {
                transaction: transaction
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "expensePerson",
            "percentage",
            {
                "type": Sequelize.DOUBLE,
                "field": "percentage",
                "allowNull": true
            },
            {
                transaction: transaction
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "expensePerson",
            "amount",
            {
                "type": Sequelize.DOUBLE,
                "field": "amount",
                "allowNull": true
            },
            {
                transaction: transaction
            }
        ]
    }
    ];
};

module.exports = {
    pos: 0,
    useTransaction: true,
    execute: function (queryInterface, Sequelize, _commands) {
        var index = this.pos;
        function run(transaction) {
            const commands = _commands(transaction);
            return new Promise(function (resolve, reject) {
                function next() {
                    if (index < commands.length) {
                        let command = commands[index];
                        console.log("[#" + index + "] execute: " + command.fn);
                        index++;
                        queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                    }
                    else
                        resolve();
                }
                next();
            });
        }
        if (this.useTransaction) {
            return queryInterface.sequelize.transaction(run);
        } else {
            return run(null);
        }
    },
    up: function (queryInterface, Sequelize) {
        return this.execute(queryInterface, Sequelize, migrationCommands);
    },
    down: function (queryInterface, Sequelize) {
        return this.execute(queryInterface, Sequelize, rollbackCommands);
    },
    info: info
};
