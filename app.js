const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboard = document.getElementById("clipboard");

const DIGITS = "0123456789";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = UPPER.toLowerCase();
const SYMBOLS = "!@#$%^&*(){}[]=<>/,.";

clipboard.addEventListener("click", () => {
	const textarea = document.createElement("textarea");
	const password = resultEl.innerText;

	if (!password) {
		return;
	}

	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand("copy");
	textarea.remove();
	alert("Password copied to clipboard");
});

generate.addEventListener("click", () => {
	const length = +lengthEl.value;
	const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;

	resultEl.innerText = generatePassword(
		hasLower,
		hasUpper,
		hasNumber,
		hasSymbol,
		length,
	);
});

function generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length) {
	let charset = "";

	if (hasLower) {
		charset += LOWER;
	}
	if (hasUpper) {
		charset += UPPER;
	}
	if (hasNumber) {
		charset += DIGITS;
	}
	if (hasSymbol) {
		charset += SYMBOLS;
	}

	return Array.from({ length }, (_) => getRandomCharacter(charset)).join("");
}

function getRandomCharacter(characters) {
	let randomNumber;
	do {
		randomNumber = crypto.getRandomValues(new Uint8Array(1))[0];
	} while (randomNumber >= 256 - (256 % characters.length));

	return characters[randomNumber % characters.length];
}
