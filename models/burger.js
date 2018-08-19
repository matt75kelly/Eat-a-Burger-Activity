const orm = require("../config/orm");

let Burger = {
    addBurger: (newBurger, cb)=>{
        let cols = ["burger_name", "burger_patty", "patty_count"];
        let values = [[newBurger.burger_name, newBurger.burger_patty, newBurger.patty_count]];

        orm.createRow("burger", cols, values, res=>{
            cb(res);
        });
    },
    addToppings: (id, topping_list, cb)=>{
        let cols = ["burger_id", "topping_name"];
        let toppings = [];
        for(let i = 0; i < topping_list.length; i++){
            let topping = [];
            topping.push(id);
            topping.push(topping_list[i]);
            toppings.push(topping);
        };
        orm.createRow("toppings", cols, toppings, res=>{
            cb(res);
        });
        
    },
    eatBurger: (eat, condition, cb)=>{
        orm.updateRow("burger", eat, condition, res=>{
            cb(res);
        });
    },
    fetchBurgerId: (burgerName, cb)=>{
        let cols = 'id';
        whereCondition = {
            burger_name : burgerName
        };
        let orderCondition = "created_at";
        orm.findOne("burger", cols, whereCondition, orderCondition, res=>{
            cb(res);
        });
    },
    listAll: cb=>{
        let orderCondition = "created_at";
        orm.findAll("burger", orderCondition, res=>{
            orm.findAll("toppings", orderCondition, results=>{
                let data = [];
                for(let i = 0; i<res.length; i++){
                    data.push(res[i]);
                    data[i].topping_list = [];
                    for(let j = 0; j < results.length; j++){
                        if(results[j].burger_id == res[i].id){
                            data[i].topping_list.push(` ${results[j].topping_name}`);
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