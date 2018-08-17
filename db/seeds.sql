USE EatBurger_db;

INSERT INTO burger (burger_name, burger_patty, patty_count)
VALUES ("Swiss Mushroom Burger", "Beef", 1),
("BBQ Bacon Burger", "Beef", 2);

INSERT INTO burger (burger_name, burger_patty)
VALUES ("A1 Steak Burger", "Steak"),
("Chicken Bacon Cheddar Burger", "Chicken");

INSERT INTO toppings (burger_id, topping_name)
VALUES (1, "Swiss Cheese"),
(1, "Mushrooms"),
(2, "BBQ Sauce"),
(2, "Bacon"),
(2, "American Cheese"),
(3, "A1 Steak Sauce"),
(3, "Cheddar Cheese"),
(4, "Bacon"),
(4, "Cheddar Cheese"),
(4, "Ranch Sauce");