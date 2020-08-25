function goToIndexHTML() {
    window.location.href = "../html/index.html";
}

function goToRecipesHTML() {
    console.log();
    var value1 = document.getElementById('diets').value;
    var queryString = "?" + value1;
    window.location.href = "../html/recipes.html" + queryString;
}

function goToSubstitutesHTML() {
    var value1 = document.getElementById('ingredientInput').value;
    var queryString = "?" + value1;
    window.location.href = "../html/substitutes.html" + queryString;
}

function getParameterFromURI() {
    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    var queries = queryString.split("&");
    for (var i = 0; i < queries.length; i++) {
        // document.write(queries[i] + "<br>");
    }
    console.log(queries[0]);
    return queries[0];
}

function getRandomRecipe() {
    var q = getParameterFromURI();
    console.log(q);
    if (q == "all") {
        q = "";
    }
    $.ajax({
        url: "https://api.spoonacular.com/recipes/random?apiKey=b9e84c56a93f4307abebc8564ddbbe6d&number=1&tags=" + q,
        success: function(res) {
            document.getElementById("output").innerHTML = "<h3>" + res.recipes[0].title + "</h3>" +
                "<p>Cooking time: " + res.recipes[0].readyInMinutes + " minutes" + " </p>";
            document.getElementById("recipe-image").src = res.recipes[0].image;
            document.getElementById("recipeSourceUrl").href = res.recipes[0].sourceUrl;
        }
    })
}


function getIngredientSubstitute() {
    var q = getParameterFromURI();
    console.log(q);
    // if empty --> go back to search
    $.ajax({
        url: "https://api.spoonacular.com/food/ingredients/substitutes?apiKey=b9e84c56a93f4307abebc8564ddbbe6d&ingredientName=" + q + "",
        success: function(res) {
            if (res.status == "failure") {
                alert("Error: no such ingredient!");
                goToIndexHTML();
            } else {
                document.getElementById("message").innerText = res.message;
                document.getElementById("outputSubs").innerHTML = displaySubstitutes(res);
            }
        }
    })
}


function displaySubstitutes(res) {

    var table = "<table>";
    table += "<caption> </caption>";
    table += "<tr> <th > # </th> <th > Ingredient </th></tr >";
    for (var i = 0; i < res.substitutes.length; i++) {
        var j = i + 1;
        table += "<tr><td>" + j + "</td><td>" + res.substitutes[i] + "</td></tr>";
    }
    return table + "</table>";

}