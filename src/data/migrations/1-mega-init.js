'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "user", deps: []
 * createTable "event", deps: [user]
 * createTable "person", deps: [event]
 * createTable "expense", deps: [event, person, person]
 * createTable "expensePerson", deps: [expense, person]
 *
 **/

var info = {
    "revision": 1,
    "name": "mega-init",
    "created": "2022-06-13T04:33:50.388Z",
    "comment": ""
};

var migrationCommands = function (transaction) {
    return [{
        fn: "createTable",
        params: [
            "user",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name",
                    "allowNull": false
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password",
                    "allowNull": false
                },
                "role": {
                    "type": Sequelize.STRING,
                    "field": "role",
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {
                "transaction": transaction
            }
        ]
    },
    {
        fn: "createTable",
        params: [
            "event",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name",
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "UserId": {
                    "type": Sequelize.UUID,
                    "field": "UserId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "user",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {
                "transaction": transaction
            }
        ]
    },
    {
        fn: "createTable",
        params: [
            "person",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name",
                    "unique": true,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "EventId": {
                    "type": Sequelize.UUID,
                    "field": "EventId",
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "event",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {
                "transaction": transaction
            }
        ]
    },
    {
        fn: "createTable",
        params: [
            "expense",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "primaryKey": true,
                    "allowNull": false
                },
                "description": {
                    "type": Sequelize.STRING,
                    "field": "description",
                    "allowNull": false
                },
                "amount": {
                    "type": Sequelize.DOUBLE,
                    "field": "amount",
                    "allowNull": false
                },
                "date": {
                    "type": Sequelize.DATE,
                    "field": "date",
                    "allowNull": false
                },
                "splitType": {
                    "type": Sequelize.ENUM('equal', 'amount', 'percentage'),
                    "field": "splitType",
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "EventId": {
                    "type": Sequelize.UUID,
                    "field": "EventId",
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "event",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "paidId": {
                    "type": Sequelize.UUID,
                    "field": "paidId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "person",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "PersonId": {
                    "type": Sequelize.UUID,
                    "field": "PersonId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "person",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {
                "transaction": transaction
            }
        ]
    },
    {
        fn: "createTable",
        params: [
            "expensePerson",
            {
                "percentage": {
                    "type": Sequelize.DOUBLE,
                    "field": "percentage",
                    "allowNull": true
                },
                "amount": {
                    "type": Sequelize.DOUBLE,
                    "field": "amount",
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "ExpenseId": {
                    "type": Sequelize.UUID,
                    "allowNull": true,
                    "field": "ExpenseId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "expense",
                        "key": "id"
                    },
                    "primaryKey": true
                },
                "PersonId": {
                    "type": Sequelize.UUID,
                    "allowNull": true,
                    "field": "PersonId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "person",
                        "key": "id"
                    },
                    "primaryKey": true
                }
            },
            {
                "transaction": transaction
            }
        ]
    }
    ];
};
var rollbackCommands = function (transaction) {
    return [{
        fn: "dropTable",
        params: ["event", {
            transaction: transaction
        }]
    },
    {
        fn: "dropTable",
        params: ["expense", {
            transaction: transaction
        }]
    },
    {
        fn: "dropTable",
        params: ["expensePerson", {
            transaction: transaction
        }]
    },
    {
        fn: "dropTable",
        params: ["person", {
            transaction: transaction
        }]
    },
    {
        fn: "dropTable",
        params: ["user", {
            transaction: transaction
        }]
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
