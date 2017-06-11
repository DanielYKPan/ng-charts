/**
 * colors
 */

export const defaultColors: Array<number[]> = [
    [255, 99, 132],
    [54, 162, 235],
    [255, 206, 86],
    [231, 233, 237],
    [75, 192, 192],
    [151, 187, 205],
    [220, 220, 220],
    [247, 70, 74],
    [70, 191, 189],
    [253, 180, 92],
    [148, 159, 177],
    [77, 83, 96]
];

// private helper functions
export interface Color {
    backgroundColor?:string | string[];
    borderWidth?:number | number[];
    borderColor?:string | string[];
    borderCapStyle?:string;
    borderDash?:number[];
    borderDashOffset?:number;
    borderJoinStyle?:string;

    pointBorderColor?:string | string[];
    pointBackgroundColor?:string | string[];
    pointBorderWidth?:number | number[];

    pointRadius?:number | number[];
    pointHoverRadius?:number | number[];
    pointHitRadius?:number | number[];

    pointHoverBackgroundColor?:string | string[];
    pointHoverBorderColor?:string | string[];
    pointHoverBorderWidth?:number | number[];
    pointStyle?:string | string[];

    hoverBackgroundColor?:string | string[];
    hoverBorderColor?:string | string[];
    hoverBorderWidth?:number;
}

// pie | doughnut
export interface Colors extends Color {
    data?:number[];
    label?:string;
}

/**
 * Generate colors by chart type
 * @param chartType
 * @param index
 * @param count
 * @returns {Color}
 */
export function getColors( chartType: string, index: number, count: number ): Color {
    if (chartType === 'pie' || chartType === 'doughnut') {
        return formatPieColors(generateColors(count));
    }

    if (chartType === 'polarArea') {
        return formatPolarAreaColors(generateColors(count));
    }

    if (chartType === 'line' || chartType === 'radar') {
        return formatLineColor(generateColor(index));
    }

    if (chartType === 'bar' || chartType === 'horizontalBar') {
        return formatBarColor(generateColor(index));
    }
    return generateColor(index);
}

/**
 * Generate a random integer
 * @param min max
 * @returns number
 * */
function getRandomInt( min: number, max: number ): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate a random color value
 * @returns {number[]|Color}
 * */
function getRandomColor(): number[] {
    return [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)];
}

/**
 * Generate colors for line|bar charts
 * @param index
 * @returns {number[]|Color}
 */
function generateColor( index: number ): number[] {
    return defaultColors[index] || getRandomColor();
}

/**
 * Generate colors for pie|doughnut charts
 * @param count
 * @returns {Colors}
 */
function generateColors( count: number ): Array<number[]> {
    let colorsArr: Array<number[]> = new Array(count);
    for (let i = 0; i < count; i++) {
        colorsArr[i] = defaultColors[i] || getRandomColor();
    }
    return colorsArr;
}

/**
 * Generate a rgba color value
 * @param color: Array<number>
 * @param alpha: number
 * @returns color: string
 * */
function rgba(color:Array<number>, alpha:number):string {
    return 'rgba(' + color.concat(alpha).join(',') + ')';
}

function formatLineColor(colors:Array<number>):Color {
    return {
        backgroundColor: rgba(colors, 0.4),
        borderColor: rgba(colors, 1),
        pointBackgroundColor: rgba(colors, 1),
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: rgba(colors, 0.8)
    };
}

function formatBarColor(colors:Array<number>):Color {
    return {
        backgroundColor: rgba(colors, 0.6),
        borderColor: rgba(colors, 1),
        hoverBackgroundColor: rgba(colors, 0.8),
        hoverBorderColor: rgba(colors, 1)
    };
}

function formatPieColors(colors:Array<number[]>):Colors {
    return {
        backgroundColor: colors.map((color:number[]) => rgba(color, 0.6)),
        borderColor: colors.map(() => '#fff'),
        pointBackgroundColor: colors.map((color:number[]) => rgba(color, 1)),
        pointBorderColor: colors.map(() => '#fff'),
        pointHoverBackgroundColor: colors.map((color:number[]) => rgba(color, 1)),
        pointHoverBorderColor: colors.map((color:number[]) => rgba(color, 1))
    };
}

function formatPolarAreaColors(colors:Array<number[]>):Color {
    return {
        backgroundColor: colors.map((color:number[]) => rgba(color, 0.6)),
        borderColor: colors.map((color:number[]) => rgba(color, 1)),
        hoverBackgroundColor: colors.map((color:number[]) => rgba(color, 0.8)),
        hoverBorderColor: colors.map((color:number[]) => rgba(color, 1))
    };
}
