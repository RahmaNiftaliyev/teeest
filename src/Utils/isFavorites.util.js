import axios from "axios";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { API_URL } from "../Config/config.constant";

export function isFavorite({ isFavorite, id }, url) {}
//https://partner.rihand.az"
export function redirect(url) {
  window.location.replace(url);
}

export function redirectToBooking(item, slug, token) {
  if (token) {
    window.location.replace(`${item}${slug}/${token}`);
  }
  window.location.replace(`${item}${slug}`);
}
export const addSalontoFavorites = (
  id,
  type,
  removeFavoriteSalons,
  addFavoriteSalons,
  salons,
  token,
  setSalons,
  setIsloading,
  t,
) => {
  const selectedSalon = salons?.find((item) => item.id === id);
  if (selectedSalon?.isFavorite) {
    removeFavoriteSalons({ id, type }).then(() => {
      updateSalons(setSalons, setIsloading, token);
    });
    toast.error(t("organizationWasDeletedSuccessfully"));
  } else {
    addFavoriteSalons({ id, type }).then(() => {
      updateSalons(setSalons, setIsloading, token);
    });
    toast.success(t("organizationWasAddedSuccessfully"));
  }
};
function updateSalons(setSalons, setIsLoading, token) {
  axios
    .get(`${API_URL}/report/landing-page/organizations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        setSalons(res.data?.data);
        setIsLoading(false);
      }
    });
}

function updateEmployees(setEmployees, setIsloading, token) {
  axios
    .get(`${API_URL}/report/landing-page/employees`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        setEmployees(res.data?.data);
        setIsloading(false);
      }
    });
}
export const addFavorite = (
  id,
  type,
  removeFavoriteEmployee,
  addFavoriteEmployee,
  employees,
  token,
  setEmployees,
  setIsloading,
  t,
) => {
  const selectedEmployee = employees?.find(
    (employee) => employee.id === id,
  );

  if (selectedEmployee?.isFavorite) {
    removeFavoriteEmployee({ id, type }).then(() => {
      updateEmployees(setEmployees, setIsloading, token);
      localStorage.removeItem("favorites");
    });
    toast.error(t("employeeWasDeletedSuccessfully"));
  } else {
    addFavoriteEmployee({ id, type }).then(() => {
      updateEmployees(setEmployees, setIsloading, token);
      localStorage.removeItem("favorites");
    });
    toast.success(t("employeeWasAddedSuccessfully"));
  }
};
