// Store image paths and names in an array
import image1 from '../images/1.jpg';
import image2 from '../images/2.jpg';
import image3 from '../images/3.jpg';
import image4 from '../images/4.jpg';
import image5 from '../images/5.jpg';
import image6 from '../images/6.jpg';
import image7 from '../images/7.jpg';
import image8 from '../images/8.jpg';
import image9 from '../images/9.jpg';
import image10 from '../images/10.jpg';
import image11 from '../images/11.jpg';
import image12 from '../images/12.jpg';
import image13 from '../images/13.jpg';
import image14 from '../images/14.jpg';
import image15 from '../images/15.jpg';
import image16 from '../images/16.jpg';

const data = [
	{ name: "Alex", image: image1 },
	{ name: "Jerom", image: image2 },
	{ name: "John", image:image3 },
	{ name: "Max", image:image4  },
	{ name: "Kostya", image: image5},
	{ name: "Jay", image: image6},
	{ name: "Den", image: image7 },
	{ name: "Ilya", image: image8 },
	{ name: "Bella", image: image9 },
	{ name: "Kate", image:  image10},
	{ name: "Henry", image:image11 },
	{ name: "Liza", image: image12},
	{ name: "Poli", image: image13 },
	{ name: "Maria", image: image14 },
	{ name: "Anna", image:image15 },
	{ name: "Sam", image:image16 }
];

const numRows = 4;
const numCols = 4;

// Initialize cards in a 4x4 grid
export const initialCards = Array.from({ length: numRows * numCols }, (_, index) => {
	const row = Math.floor(index / numCols);
	const col = index % numCols;
	return {
		id: index,
		content: `Card id${index}`,
		color: "",
		highlighted: false,
		highlightColor: "",
		status: "peace",
		row,
		col,
		live: true,
		name: data[index].name,
		imageSrc: data[index].image,
	};
});