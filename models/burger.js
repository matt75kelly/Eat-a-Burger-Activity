const orm = require("../config/orm");

let Burger = {
    addBurger: (newBurger, cb)=>{
        let cols = "burger_name, burger_patty, patty_count"
        orm.createRow("burger", cols, newBurger, res=>{
            cb(res);
        });
    },
    addToppings: (topping_list, cb)=>{
        let cols = "burger_id, topping_name";
        orm.createRow("toppings", cols, topping_list, res=>{
            cb(res);
        });
    },
    eatBurger: (eat, condition, cb)=>{
        orm.updateRow("burger", eat, condition, res=>{
            cb(res);
        });
    },
    fetchBurgerId: (burgerName, cb)=>{
        let cols = "id";
        whereCondition = {
            burger_name : burgerName
        };
        let orderCondition = "created_at DESC";
        orm.findOne("burger", cols, whereCondition, orderCondition, res=>{
            cb(res);
        });
    },
    listAll: cb=>{
        let cols = "id, burger_name, burger_patty, patty_count, topping_name";
        let joinCondition = {
            id: burger_id
        };
        let orderCondition = "created_at DESC";
        orm.findAll("burger", "toppings", cols, joinCondition, orderCondition, res=>{
            cb(res);
        });
    },
    removeBurger: (burger, cb)=>{
        orm.delete("burger", burger, res=>{
            cb(res);
        });
    },
    removeTopping: (topping, cb)=>{
        orm.delete("toppings", topping, res=>{
            cb(res);
        });
    } 
}

module.exports = Burger;