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
        let orderCondition = "created_at DESC";
        orm.findAll("burger", orderCondition, res=>{
            orm.findAll("toppings", orderCondition, results=>{
                let data = [];
                for(let i = 0; i<res.length; i++){
                    data.push(res[i]);
                    data[i].topping_list = [];
                    for(let j = 0; j < results.length; j++){
                        if(results[j].burger_id == res[i].id){
                            data[i].topping_list.push(results[j].topping_name);
                        }
                    }
                }
                cb(res);
            });
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