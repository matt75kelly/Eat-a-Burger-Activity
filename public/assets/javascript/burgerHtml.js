function collectToppings(){
    let array = [];
    let toppings = $(".toppings:checked");    
    for(let i = 0; i < toppings.length; i++){
        // console.log(toppings[i]);
        array.push(toppings[i].id);
    }
    // console.log(array);
    return array;
}
// Main Function calls
$(document).ready(function(){
    $(".submit").on("click", function(){
        event.preventDefault();
        let newBurger ={
            burgerName: $("#burgerName").val().trim(),
            burgerPatty: $("#burgerPatty").val().trim(),
            pattyCount: $("#pattyCount").val().trim(),
            topping_list: collectToppings()
        };
        console.log(newBurger);
        $.ajax({
            url: "/api/burgers/",
            method: "POST",
            data: newBurger
        }).catch(err=>{
            console.log(`Burger Creation: ${err}`);
        }).then(function(results){
            location.reload();
        })
    });

    $(".eat").on("click", function(){
        event.preventDefault();
        let burgerId = $(this).attr("data-eatid");
        console.log(`Eat ID: ${burgerId}`);
        $.ajax({
            url: `/api/burgers/${burgerId}`,
            method: "PUT",
        }).catch(err=>{
            console.log(`Eating Burger: ${err}`);
        }).then(result=>{
            location.reload();
        });
    });

    $('.delete').on("click", function(){
        event.preventDefault();
        let burgerId = $(this).attr("data-deleteid");
        $.ajax({
            url: `/api/burgers/${burgerId}`,
            method: "DELETE"
        }).catch(err=>{
            console.log(`Deleting Eaten Burger: ${err}`);
        }).then(results=>{
            location.reload();
        })
    })
});