const express = require("express");
let router = express.Router();

let Burger = require("../models/burger");

router.get("/", (req, res)=>{
    // Need to pull the info for the Burgers that are Created but yet to be Eaten
    Burger.listAll(data=>{
       // Structure this data for handlebars 
        let hbsObject = {
            burgers: data
        };
        // Render this data with handlebars
        // console.log(hbsObject);
        // console.log(hbsObject.burgers[1].topping_list);
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
    Burger.addBurger([newBurger], data=>{
        // Pull the Database ID# of the Burger we just created
        Burger.fetchBurgerId(data.burger_name, result=>{

            // Add our toppings to our Database toppings table
            Burger.addToppings(req.body.topping_list, results=>{
                // Refresh the webpage
                newBurger.toppings = results;
                console.log(newBurger);
                res.json(newBurger);
            });
             
        });   
    });   
});

router.put("/api/burgers/:id", (req, res)=>{
    let condition = {
        id: req.params.id
    };
    let eat = {
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
              let topping = {
                  burger_id: req.params.id
              };
              Burger.removeToppings(topping, results=>{
                  res.status(200).end();
              })
              
          }
      });
  });

  module.exports = router;