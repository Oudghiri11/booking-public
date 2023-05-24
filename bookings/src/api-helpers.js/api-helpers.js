import axios from "axios";

export const getAllMovies = async () => {
  const res = await axios
    .get("https://booking-public-three.vercel.app/movie")
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("No Data");
  }
  const data = await res.data;
  return data;
};
export const sendUserAuthRequest = async (data, signup) => {
  const res = await axios
    .post(`https://booking-public-three.vercel.app/user/${signup ? "signup" : "login"}`, {
      name: signup ? data.name : "",
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));

  if (res.status !== 200 && res.status !== 201) {
    console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};

export const sendAdminAuthRequest = async (data) => {
  const res = await axios
    .post("https://booking-public-three.vercel.app/admin/login", {
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpectyed Error");
  }

  const resData = await res.data;
  return resData;
};
export const getMovieDetails = async (id) => {
  const res = await axios.get(`https://booking-public-three.vercel.app/movie/${id}`).catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const newBooking = async (data) => {
  const res = await axios
    .post("https://booking-public-three.vercel.app/booking", {
      movie: data.movie,
      seatNumber: data.seatNumber,
      date: data.date,
      user: localStorage.getItem("userId"),
    })
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};
export const getUserBooking = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios
    .get(`https://booking-public-three.vercel.app/user/bookings/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const deleteBooking = async (id) => {
  const res = await axios
    .delete(`https://booking-public-three.vercel.app/booking/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unepxected Error");
  }

  const resData = await res.data;
  return resData;
};

export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios.get(`https://booking-public-three.vercel.app/user/${id}`).catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

/*export const AddMovie = async (data) => {
  const res = await axios
    .post(
      "/movie",
      {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        posterUrl: data.posterUrl,
        fetaured: data.fetaured,
        actors: data.actors,
        admin: localStorage.getItem("adminID"),
      },
      {
        headers: {
          Authorization: `bearer ${localStorage.getItem("tolen")}`,
        },
      }
    )
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected Error Occurred");
  }
  const resData = await res.Data;
  return resData;
};*/
/*export const addMovie = async (data) => {
  const res = await axios
    .post(
      "/movie",
      {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        posterUrl: data.posterUrl,
        fetaured: data.fetaured,
        actors: data.actors,
        admin: localStorage.getItem("adminId"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};
*/
export const addMovie = async (data) => {
  try {
    const res = await axios.post(
      "https://booking-public-three.vercel.app/movie",
      {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        posterUrl: data.posterUrl,
        featured: data.featured,
        actors: data.actors,
        trailerUrl: data.trailerUrl,
       
        admin: localStorage.getItem("adminID"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (res.status !== 200) {
      throw new Error("Unexpected Error Occurred");
    }

    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};


export const getAdminById = async () => {
  const adminId = localStorage.getItem("adminId");
  const res = await axios
    .get(`https://booking-public-three.vercel.app/admin/${adminId}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};
export const deleteMovieById = async (movieId) => {
  try {
    const res = await axios.delete(`https://booking-public-three.vercel.app/movie/${movieId}`);
    if (res.status !== 200) {
      throw new Error("Unexpected Error Occurred");
    }
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
