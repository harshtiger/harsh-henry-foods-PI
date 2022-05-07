import axios from "axios";

export default function DeleteRecipes  (id)  {
 console.log("jaja")
  return axios.delete(`/home/${id}`);

};

