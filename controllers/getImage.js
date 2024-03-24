async function getImageUrl(res) {
    if (res.locals && res.locals.img_url) {
        return res.locals.img_url;
    }
}

module.exports = getImageUrl;
