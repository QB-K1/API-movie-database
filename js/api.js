'use strict';

// stocker la key pour l'api dans une constante pour alléger le code
const API_KEY = '2ee2c5b569240ea2a2a879dd9c8a822c';


//fonction affichant résultats de la recherche
function search(serial) {
	// syntaxe d'une requête complète ajax, pas comme $.get qui est une écriture simplifiée
	$.ajax({
		// URL et key données par la doc de l'API
		url: 'https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + '&query=' + serial,
		type : 'GET', // équivalent à requête qui serait $.get
		dataType: 'json', // les API doivent renvoyer du JSON
		// ce qui est dans success seront les actions à effectuer si succès, cad une fois tout la réponse à la requête chargée (équivalent du callback)
		success : function(response){

			var list = $('<ul>');

			// boucle pour parcourir le tableau contenant les réponses
			for(var i = 0; i < response.results.length; i++) {

			/*la fonction .append va rajouter nouvelle indentation au sein de addressBookList, équivalent du document write, avec ce qui est entre parenthèse incrusté direct en HTML*/
			/*li va en faire une puce, équivalent du document write, créant balise ouvrante et fermante autour*/
				/*lui donne un data-id ayant pour valeur le code du film dans la database*/
			/* va rendre cliquable la propriété title du tableau results de l'élément response, pour l'index à chaque tour, en le linkant à élément ayant pour id 'decription'*/
			list.append($('<li data-id="' + response.results[i].id + '">').append($('<p>').append(response.results[i].title)));
			};

			// écrase contenu de baise ayant ID resultsList par la liste après l'avoir vidé
			$('#resultsList').empty().append(list);
		// récupère en console log l'objet correspondant à la fiche du film renvoyé par l'API
		console.log(response);
		}
	});
}


// fonction pour lancer la fonction cherchant les titres au click. Passe en paramètres e qui représente tous les events possible sur la page, sert à ligne suivante
function onClickSearch(e) {
	// formule qui évite comportement par défaut quand charge event sur la page, à savoir ici recharger toute la page : va lancer event sans recharger la page, évite que contenu disparaisse car de base non visible tant que pas coché bouton
	e.preventDefault();
	// stocke dans variable valeur de l'input rentrée par l'utilisateur
	var searchInput = $('#searchButton').val();
	// lance fonction recherche en lui passant string rentrée par user
	search(searchInput);
}







// fonction pour afficher description des films
function description(id) {
	$.ajax({
		url: 'https://api.themoviedb.org/3/movie/'+id+'?api_key='+API_KEY,
		type : 'GET',
		dataType: 'json',
		success : function(response){
			console.log(response)
			var result = $('<div>');

			var img = $('<img>').attr('src', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/'+response.poster_path).css('width', '250px');
			var title = $('<h1>').append(response.title);
			var year = $('<h2>').append(response.release_date);
			var desc = $('<p>').append( response.overview );
			var note = $('<p>').append( response.vote_average );

			result.append(img).append(title).append(year).append(desc).append(note);
			$('#movieDetails').html(result);
		}
	});
}

// fonction pour lancer la fonction affichant la description au click. Passe en paramètres e qui représente tous les events possible sur la page, sert à ligne suivante
function onClickDescription() {

	var movie = $(this).data('id');

	description(movie);
}