const express = require("express");
let router = express.Router();

let Burger = require("../models/burger");

router.get("/", (req, res)=>{
    // Need to pull the info for the Burgers that are Created but yet to be Eaten
    Burger.listAll(data=>{
       // Structure this data for handlebars 
        let hbsObject = {
        burgersEaten : [],
        burgersNotEaten : []
        };
        for(let i = 0; i < data.length; i++){
            if(burgers[i].is_eaten == false){
                hbjObject.burgersNotEaten.push(data[i]);
            }
            else {
                hbsObject.burgersEaten.push(data[i]);
            }
        }
        // Render this data with handlebars
        res.render("index", hbsObject); 
    }); 
});

router.post("/api/burgers", (req, res)=>{
    let newBurger = {
        burger_name: req.body.burgerName,
        burger_patty: req.body.pattyType,
        patty_count: req.body.pattyCount || 1,
    };
    // Add new Burger to the Database burger table
    Burger.addBurger(newBurger, data=>{
        // Pull the Database ID# of the Burger we just created
        Burger.fetchBurgerId(data.burger_name, result=>{
           let topping_list = [];
            for(let i = 0; i < req.body.toppings.length; i++){
                topping_list[i] = {
                    burger_id: result.id,
                    topping_name: req.body.toppings[i]
                }
            }
            // Add our toppings to our Database toppings table
            Burger.addToppings(topping_list, results=>{
                // Refresh the webpage
                newBurger.toppings = results;
                console.log(newBurger);
                res.json(newBurger);
            });
             
        });

        
    });
    
});

router.put("/api/burgers/:id", (req, res)=>{
    let condition = `id = ${req.params.id}`;
    let eaten ={
        is_eaten: true
    };
    Burger.eatBurger(eat, condition, result=>{
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });

  router.post("/api/toppings/:id", (req, res)=>{
    let newTopping = {
        burger_id: req.params.id,
        topping_name: req.body.topping
    };
    Burger.addToppings([newTopping], results=>{
        res.json(results);
    });
  });

  router.delete("/api/toppings/:id", (req, res)=>{
      let topping ={
          burger_id: req.params.id,
          topping_name: req.body.topping
      };  
      Burger.removeTopping(topping, result=>{
        if (result.changedRows == 0) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end();
        } else {
          res.status(200).end();
        }
      });
  });

  router.delete("/api/burgers/:id", (req, res)=>{
      let burger ={
          id: req.params.id,
      };
      Burger.removeBurger(burger, result=>{
          if(result.changedRows ==  0){
              return res.status(404).end();
          } else {
              res.status(200).end();
          }
      });
  });