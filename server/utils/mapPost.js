const ta = require('time-ago');

const mapPostOutput = (post, userId) => {
    const now = new Date(); // Get the current date and time
    const createdAt = new Date(post?.createdAt); // Parse the post's creation date

    const timeDifference = now - createdAt; // Calculate the time difference in milliseconds

    // Define time units
    const timeUnits = [
        { unit: 'd', divisor: 24 * 60 * 60 * 1000 }, // days
        { unit: 'h', divisor: 60 * 60 * 1000 }, // hours
        { unit: 'm', divisor: 60 * 1000 }, // minutes
        { unit: 's', divisor: 1000 } // seconds
    ];

    let timeAgo = '';

    // Loop through time units and build the timeAgo string
    for (const unit of timeUnits) {
        const value = Math.floor(timeDifference / unit.divisor);
        if (value > 0) {
            timeAgo = `${value}${unit.unit}`;
            break; // Stop at the first non-zero unit
        }
    }

    return {
        _id: post._id,
        caption: post.caption,
        image: post.image,
        owner: {
            _id: post.owner._id,
            username: post.owner.username,
            avatar: post.owner.avatar
        },
        likesCount: post.likes.length,
        isLiked: post?.likes?.includes(userId),
        timeAgo: timeAgo
    };
};

module.exports = {
    mapPostOutput
};
