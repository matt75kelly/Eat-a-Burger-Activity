const express = require("express");
let router = express.Router();

let burger = require("../models/burger");

router.get("/", (req, res)=>{
    // Need to pull the info for the Burgers that are Created but yet to be Eaten
    let burgers = burger.listAll();
    // Structure this data for handlebars 
    let hbsObject = {
     burgersEaten : [],
     burgersNotEaten : []
    };
    for(let i = 0; i < burgers.length; i++){
        if(burgers[i].is_eaten == false){
            hbjObject.burgersNotEaten.push(burgers[i]);
        }
        else {
            hbsObject.burgersEaten.push(burger[i]);
        }
    }
    // Render this data with handlebars
    res.render("index", hbsObject);
});

router.post("/api/burgers", (req, res)=>{
    let newBurger = {
        burger_name: req.body.burgerName,
        burger_patty: req.body.pattyType,
        patty_count: req.body.pattyCount,
    };
    // Add new Burger to the Database burger table
    burger.addBurger(newBurger);
    // Pull the Database ID# of the Burger we just created
    let burgerId = burger.fetchBurgerId(newBurger.burger_name);

    let topping_list = [];
    for(let i = 0; i < req.body.toppings.length; i++){
        topping_list[i] = {
            burger_id: burgerId,
            topping_name: req.body.toppings[i]
        }
    }
    // Add our toppings to our Database toppings table
    burger.addToppings(topping_list);
    // Refresh the webpage
    res.redirect("/");
});

router.put("/api/burgers/:id", (req, res)=>{
    let condition = `id = ${req.params.id}`;
    let changeBurger ={
        is_eaten: req.body.eaten
    };
    burger.update(changeBurger, condition, result=>{
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
    burger.addToppings([newTopping]);
    res.status(200).end();
  });

  router.delete("/api/toppings/:id", (req, res)=>{
      let topping ={
          burger_id: req.params.id,
          topping_name: req.body.topping
      };  
      burger.removeTopping(topping, result=>{
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
      burger.remove(burger, result=>{
          if(result.changedRows ==  0){
              return res.status(404).end();
          } else {
              res.status(200).end();
          }
      });
  });