// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
	return [...new Set(moviesArray.map(({ director }) => director))];
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
	const theDirector = 'Steven Spielberg';
	const theGenre = 'Drama';

	return moviesArray.filter(({ genre, director }) => {
		return director === theDirector && genre.includes(theGenre);
	}).length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
	if (!moviesArray.length) return 0;

	const sumOfScore = moviesArray.reduce(
		(sum, { score }) => sum + (score || 0),
		0
	);

	return Math.round((sumOfScore * 100) / moviesArray.length) / 100;
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
	const dramaGenre = 'Drama';

	const dramaMovies = moviesArray.filter(({ genre }) =>
		genre.includes(dramaGenre)
	);

	return scoresAverage(dramaMovies);
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
	return [...moviesArray].sort((a, b) =>
		a.year === b.year ? a.title.localeCompare(b.title) : a.year - b.year
	);
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
	return [...moviesArray]
		.map(({ title }) => title)
		.sort()
		.slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
	return [...moviesArray].map(movie => {
		const [hourPart, minutePart] = movie.duration.split(' '); // ['2h', '12min'] or ['2h', undefined]
		const hour = parseInt(hourPart) || 0;
		const minute = parseInt(minutePart) || 0;

		return { ...movie, duration: hour * 60 + minute };
	});
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
	if (!moviesArray.length) return null;

	// group array of scores by year
	const yearsDictionary = moviesArray.reduce(
		(dictionary, { year, score }) => ({
			...dictionary,
			[year]: [...(dictionary[year] || []), score],
		}),
		{}
	); // { 2014: [8.3, 8.6, 6.4], ... }

	// for each year reduce score arrays to an average score
	for (const year in yearsDictionary) {
		yearsDictionary[year] = yearsDictionary[year].reduce(
			(avg, score) => avg + score / yearsDictionary[year].length,
			0
		);
	} // { 2014: 8.56377, ... }

	// reduce dictionary to an object holding the target year and average score
	const bestYear = Object.entries(yearsDictionary) // [[ 2014, 8.4 ], [ 2015, 8.65 ], ...]
		.sort(([yearA, _], [yearB, __]) => yearA - yearB)
		.reduce(
			(best, [year, avgScore]) =>
				avgScore > best.avgScore ? { year, avgScore } : best,
			{ year: null, avgScore: -Infinity }
		); // { year: 2014, avgScore: 8.4 }

	return `The best year was ${bestYear.year} with an average score of ${bestYear.avgScore}`;
}
