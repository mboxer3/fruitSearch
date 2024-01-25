const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function search(str) {
	// return fruits filtered with the parameter of "val" 
	// convert the fruits name to lowercase()
	// the current fruit name includes a lowercase version of the provided string
	return fruit.filter((val) =>val.toLowerCase().includes(str.toLowerCase()))
}

function searchHandler(e) {
	/* create a results variable and assign it to the search function
	retrieve the current value entered in input
	if the value entered in the input is truthy(not emoty)
	run the function showSuggestions with the arguements of result and the value entered in the input
	if the falsy (empty) replace the children of the element to hide suggestions
	*/
	const results = search(input.value)
	input.value ? showSuggestions(results, input.value) : suggestions.replaceChildren()
}

function showSuggestions(results, inputVal) {
	/*
	replace the children of suggestions
	iterate over the results
	give an alias to the current results index lowercased to result
	lowercase the inputVal and give it an alias of input
	search for the input on the result and give it an alias of boldStart
	create a new li and give it an alias of newLi
	create a bold element and give it an alias of bold
	create a span for the beggining of teh word
	create a span for the end of the word
	if the result startsWith at the input field
	bold the text = the first element at inputVal upperCased + a copy of the input at teh second element
	the endWord text = the current index at the current results (alias) 
	appendChild bold onto the newLi
	appendChild endWord onto the newLi
	else 
	begWord's innerText = take a portion of the fruit string from and not including the 0 index specified by boldStart
	endWord's text = take a portion of the fruit string starting boldStart and the input val's length

	Set the text content of the 'bold' element to the user's input

	Create a new list item (newLi) and append the 'begWord', 'bold', and 'endWord' elements to it



	// Append the newly constructed list item (newLi) to the HTML element referenced by the variable or ID name 'suggestions'
	*/
	suggestions.replaceChildren()
	for (let fruit of results) {
		const result = fruit.toLowerCase()
		const input = inputVal.toLowerCase()
		const boldStart = result.search(input)
		const newLi = document.createElement("li")
		const bold = document.createElement("b")
		const begWord = document.createElement('span')
		const endWord = document.createElement("span")
		if (result.startsWith(input)) {
			bold.innerText = inputVal[0].toUpperCase() + input.slice(1)
			endWord.innerText = result.slice(inputVal.length)
			newLi.appendChild(bold)
			newLi.appendChild(endWord)
		} else {
			begWord.innerText = fruit.slice(0, boldStart)
			endWord.innerText = fruit.slice(boldStart + inputVal.length)
			bold.innerText = input
			newLi.append(begWord)
			newLi.append(bold)
			newLi.append(endWord)
		}
		suggestions.appendChild(newLi)
	}
}

function useSuggestion(e) {
	// Set the value of the HTML input field (inputField) to the text content of the clicked element (e.target)
	// Clear or replace the children of the 'suggestions' element, likely hiding or removing the suggestion list

	input.value = e.target.innerText
	suggestions.replaceChildren()
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);