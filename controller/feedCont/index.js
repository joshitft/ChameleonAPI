

exports.getOneFeed = (req,res)=>{
    res.json({
        name: 'Hello from a private endpoint! You need to be authenticated to see this.',
        created: "01-02-2018 20:21:00",
        updated: "02-02-2018 20:21:00",
        removed: "03-02-2018 20:21:00",
        image: "https://images.pexels.com/photos/705075/pexels-photo-705075.jpeg?auto=compress&cs=tinysrgb&h=350",
        likes: 10000000,
        shares: 20000000,
        comments: 3000000,
        userName: "John Doe",
        city: "San Fransisco",
        profileImg: "http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg"
    });
};