const getMax = (histogram) => {
    const max = { red: 0, blue: 0, green: 0 };
    for (let i = 0; i <= 255; i++) {
        if (histogram.red[i] > max.red) {
            max.red = histogram.red[i];
        }

        if (histogram.blue[i] > max.blue) {
            max.blue = histogram.blue[i];
        }

        if (histogram.green[i] > max.green) {
            max.green = histogram.green[i];
        }
    }
    return max;
};

const countHistogram = (histogram) => {
    const red = {};
    const green = {};
    const blue = {};
    const alpha = {};
    for (const colors of histogram) {
        if (red[colors["red"]] === undefined) {
            red[colors["red"]] = 1;
        } else {
            red[colors["red"]]++;
        }

        if (green[colors["green"]] === undefined) {
            green[colors["green"]] = 1;
        } else {
            green[colors["green"]]++;
        }

        if (blue[colors["blue"]] === undefined) {
            blue[colors["blue"]] = 1;
        } else {
            blue[colors["blue"]]++;
        }

        if (alpha[colors["alpha"]] === undefined) {
            alpha[colors["alpha"]] = 1;
        } else {
            alpha[colors["alpha"]]++;
        }
    }
    const max = getMax({ red, green, blue });
    //! setHistogram({ red, green, blue });
    return { red, green, blue, alpha, max };
};

export const createHistogram = (ctx, image) => {
    const myImgData = ctx.getImageData(0, 0, image.width, image.height);
    const colors = [];
    for (let i = 0; i < myImgData.data.length; i += 4) {
        colors.push({
            red: myImgData.data[i],
            green: myImgData.data[i + 1],
            blue: myImgData.data[i + 2],
            alpha: myImgData.data[i + 3],
        });
    }
    return countHistogram(colors);
};
