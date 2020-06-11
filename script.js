var request = require('request');
var cheerio = require('cheerio');

var firstRequest = 'https://www.marmiton.org/recettes/recette_tarte-aux-pommes_18588.aspx';

request('https://www.marmiton.org/recettes/recette_couscous-poulet-et-merguez-facile_17751.aspx', function(error, response, body){
  if (error){
    console.log(error)
  } else {
    var scrap = cheerio.load(body);

    // récupérer nom de la recette + nombre de personnes
    var title = scrap(".main-title").text();
    var people = scrap('.recipe-infos__quantity__value').text();

    // récupérer les temps de cuisson, préparation et total
    var totalTime = scrap('.recipe-infos__total-time__value').text();
    var preparationTime = scrap('.recipe-infos__timmings__preparation').text();
    var finalPreparationTime = preparationTime.slice(26,32);
    var cookTime = scrap('.recipe-infos__timmings__value').text();
    var finalCookTime = cookTime.slice(13, 19);

    // récupérer la liste des ingrédients
    var quantityList = [];
    var ingredientsList = [];
    var complementList = [];
    var ingredients = [];

    var quantityScrap = scrap(".recipe-ingredient-qt").each(function(){
      var quantity = scrap(this).text()
      quantityList.push(Number(quantity))
    });

    var ingredientsScrap = scrap(".ingredient").each(function(){
      var ingredient = scrap(this).text();
      ingredientsList.push(ingredient)
    });

    var complementScrap = scrap(".recipe-ingredient__complement").each(function(){
      var complement = scrap(this).text();
      complementList.push(complement)
    });

    for (var i = 0; i < quantityList.length; i++){
      for (var j = 0; j < ingredientsList.length; j++){
        for (var k = 0; k < complementList.length; k++){
          if (i === j && i === k){
            if (complementList[k] === ' '){
              ingredients.push(quantityList[i] + ' ' + ingredientsList[j])
            } else {
              ingredients.push(quantityList[i] + ' ' + ingredientsList[j] + complementList[k])
            }
          }
        }

      }
    };

    // récupérer les étapes de préparation
    var preparation = [];

    var preparationList = scrap(".recipe-preparation__list__item").each(function(){
      preparation.push(scrap(this).text())
    });

    // Objet final à renvoyer
    var recette = {
      nom: title,
      nbPers: Number(people),
      temps: {total: totalTime, preparation: finalPreparationTime, cuisson: finalCookTime},
      ingredients: ingredients,
      preparation: preparation
    };
    console.log(recette)
  }
});
