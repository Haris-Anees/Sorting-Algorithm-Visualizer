import React from "react";
import "./styles.css";

export default class SortingAlgo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numbers: [], //Containg the values of the chart
      isSorting: false, //If the graph is currrently sorting
      coloredBar1: false, //The first current value sorting
      coloredBar2: false, //The second current value soring
      isAscending: true, // True meaning ascending, false meaning descending
    };
  }

  /**
   * Rendering the graph onto the page initially
   */
  componentDidMount() {
    this.resetNumbers();
  }

  /**
   * Creating a way to reset the graph by changing the state of the numbers array
   */
  resetNumbers() {
    let integer = 0;
    const numbers = [];

    for (let i = 0; i < 70; i++) {
      integer = Math.floor(Math.random() * 101 - 4) + 4;
      numbers.push(integer);
    }

    this.setState({ numbers });
  }

  /**
   * This method sorts the graph thorough the process of selection sort.
   * It is an async function meaning it must wait for the graph to be updated before it could proceed.
   */
  async selectionSort() {
    const { numbers, isAscending } = this.state;
    this.setState({ isSorting: true });

    let swap = 0;

    for (let i = 0; i < numbers.length - 1; i++) {
      let lowestIndex = i;
      for (let j = i + 1; j < numbers.length; j++) {
        if (isAscending ? numbers[j] < numbers[lowestIndex] : numbers[j] > numbers[lowestIndex]) { //If true, accending order, if false decending
          lowestIndex = j;
        }
      }

      swap = numbers[i];
      numbers[i] = numbers[lowestIndex];
      numbers[lowestIndex] = swap;

      //The updating of the graph
      this.setState({ numbers, coloredBar1: i, coloredBar2: lowestIndex });
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    this.setState({ isSorting: false, coloredBar1: false, coloredBar2: false });
  }

  /**
  * This method sorts the graph thorough the process of selection sort.
  * It is an async function meaning it must wait for the graph to be updated before it could proceed.
  */
  async bubbleSort() {
    const { numbers, isAscending } = this.state;
    this.setState({ isSorting: true });

    let swapped;
    let temp = 0;

    for (let i = 0; i < numbers.length - 1; i++) {
      swapped = false;
      for (let j = 0; j < numbers.length - i - 1; j++) {
        if (isAscending ? numbers[j] > numbers[j + 1] : numbers[j] < numbers[j + 1]) { //If true, accending order, if false decending
          temp = numbers[j];
          numbers[j] = numbers[j + 1];
          numbers[j + 1] = temp;
          swapped = true;
        }

        //Showing the location of the values on the graph and updating
        this.setState({ numbers, coloredBar1: j, coloredBar2: j + 1 });
        await new Promise((resolve) => setTimeout(resolve, 10));
      }

      if (!swapped) break;
    }

    this.setState({ isSorting: false, coloredBar1: false, coloredBar2: false });
  }

  /**
  * This method sorts the graph thorough the process of insertion sort.
  * It is an async function meaning it must wait for the graph to be updated before it could proceed.
  */
  async insertionSort() {
    const { numbers, isAscending } = this.state;
    this.setState({ isSorting: true });

    for (let count = 1; count < numbers.length; count++) {
      let key = numbers[count];
      let i = count - 1;

      while (i >= 0 && (isAscending ? numbers[i] > key : numbers[i] < key)) { //If true, accending order, if false decending
        numbers[i + 1] = numbers[i];
        i--;

        //Showing the location of the values on the graph and updating
        this.setState({ numbers, coloredBar1: i, coloredBar2: count });
        await new Promise((resolve) => setTimeout(resolve, 45));
      }

      numbers[i + 1] = key;

      //Showing the location of the values on the graph and updating
      this.setState({ numbers, coloredBar1: i + 1, coloredBar2: count });
      await new Promise((resolve) => setTimeout(resolve, 45));
    }

    this.setState({ isSorting: false, coloredBar1: false, coloredBar2: false });
  }

  /**
   * This method sorts the graph thorough the process of insertion sort.
   * It is an async function meaning it must wait for the graph to be 
   * updated before it could proceed.
   * 
   * @param {number[]} arr - The array to be sorted.
   * @param {number} low - The starting index of the partition to sort.
   * @param {number} high - The ending index of the partition to sort.
   */
  async quickSort(arr, low, high) {

    this.setState({ isSorting: true });

    if (low < high) {
      let partitionIndex;
      partitionIndex = await this.quickSortPartition(arr, low, high); //Wating for the partition

      await this.quickSort(arr, low, partitionIndex - 1);
      await this.quickSort(arr, partitionIndex + 1, high);
    }

    this.setState({ isSorting: false, coloredBar1: false, coloredBar2: false });

  }

  /**
  * 
  */

  /**
   * This a helper method for quick sort for finding the partition index
   * It is an async function meaning it must wait for the graph to be 
   * updated before it could proceed.
   * 
   * @param {number[]} arr - The array to partition.
   * @param {number} low - The starting index of the partition.
   * @param {number} high - The ending index of the partition.
   * @returns {number} - The index of the pivot element after partitioning.
   */
  async quickSortPartition(arr, low, high) {
    const { isAscending } = this.state;
    let pivot = arr[high];
    let temp;
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
      if (isAscending ? arr[j] < pivot : arr[j] > pivot) { //If true, accending order, if false decending
        i++;

        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }

      //Showing the location of the values on the graph and updating
      this.setState({ coloredBar1: i, coloredBar2: j });
      await new Promise((resolve) => setTimeout(resolve, 45));
    }
    i++;

    temp = arr[i];
    arr[i] = arr[high];
    arr[high] = temp;

    return i;
  }

  /**
   * Updates the sorting order state based on the dropbox
   * The method sets the isAscending state to true if the selected value is ascending,
   * otherwise sets it to false.
   * @param {Event} event - The event The event object triggered by the dropdown change.
   */
  handleOrderChange = (event) => {
    this.setState({ isAscending: event.target.value === "ascending" });
  };

  /**
   * 
   * @returns 
   */
  render() {
    const { numbers, isSorting, coloredBar1, coloredBar2 } = this.state;

    return (
      <div className="spacing">

        {/* Container for the graph */}
        <div className="graphGrid">
          {numbers.map((value, index) => (
            <div className="number-row" key={index}>
              <div
                className="individual-number"
                style={{
                  height: `${value * 5}px`,
                  backgroundColor:
                    index === coloredBar1 || index === coloredBar2
                      ? "red"
                      : "pink",
                }}
              ></div>
            </div>
          ))}
        </div>

        {/* Container for buttons and controls */}
        <div className="buttonAlign">
          {/* Button to generate a new graph */}
          <button
            className="button"
            onClick={() => this.resetNumbers()}
            disabled={isSorting} //Disable button during sorting
          >
            <div className="buttonName">Generate New Graph</div>
          </button>

          {/* Container for sorting algorithm buttons */}
          <div className="sortingButtonsAlign">
            {/* Button for Selection Sort */}
            <button
              className="button"
              onClick={() => this.selectionSort()}
              disabled={isSorting} //Disable button during sorting
            >
              <div className="buttonName">Selection Sort</div>
            </button>

            {/* Button for Bubble Sort */}
            <button
              className="button"
              onClick={() => this.bubbleSort()}
              disabled={isSorting} //Disable button during sorting
            >
              <div className="buttonName">Bubble Sort</div>
            </button>

            {/* Button for Insertion Sort */}
            <button
              className="button"
              onClick={() => this.insertionSort()}
              disabled={isSorting} //Disable button during sorting
            >
              <div className="buttonName">Insertion Sort</div>
            </button>

            {/* Button for Quick Sort */}
            <button
              className="button"
              onClick={() => this.quickSort(numbers, 0, numbers.length - 1)}
              disabled={isSorting} //Disable button during sorting
            >
              <div className="buttonName">Quick Sort</div>
            </button>
          </div>

          {/* Dropdown for selecting sorting order */}
          <label className="dropdown">
            Pick an Order:
            <select onChange={this.handleOrderChange}>
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </select>
          </label>
        </div>
      </div>
    );
  }
}
