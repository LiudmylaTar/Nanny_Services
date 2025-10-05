import { useState } from "react";
import { toast } from "react-toastify";
import css from "./NannyItem.module.css";
import useCurrentUser from "../../hooks/useCurrentUser";
import Icon from "../../shared/Icon";
import type { Nanny } from "../../types/nanny";
import DetailNannyData from "../DetailNannyData/DetailNannyData";

interface NannyItemProps {
  nanny: Nanny;
  // isFavorite?: boolean;
}

export default function NannyItem({ nanny }: NannyItemProps) {
  const {
    name,
    avatar_url,
    location,
    rating,
    price_per_hour,
    birthday,
    experience,
    kids_age,
    characters,
    education,
    about,
  } = nanny;

  const [showDetails, setShowDetails] = useState(false);
  const { data: user } = useCurrentUser();

  const handleReadMore = () => {
    if (!user) {
      toast.info("Please log in to see more details.");
      return;
    }
    setShowDetails(true);
  };
  const age = new Date().getFullYear() - new Date(birthday).getFullYear();
  return (
    <div className={css.container}>
      <div className={css.imgWrapper}>
        <img
          className={css.img}
          src={avatar_url}
          alt={name}
          height={96}
          width={96}
        />
      </div>
      <div className={css.mainInfo}>
        <div className={css.firstBlock}>
          <div className={css.name}>
            <p className={css.nanny}>Nanny</p>
            <h3 className={css.title}>{name}</h3>
          </div>

          <div className={css.generalWrapper}>
            <ul className={css.generalList}>
              <li className={css.generalItem}>
                {" "}
                <Icon name="map-pin" className={css.icon} /> {location}
              </li>
              <li className={css.generalItem}>
                {" "}
                <Icon name="star" className={css.icon} /> Rating: {rating}
              </li>
              <li className={css.generalItem}>
                Price / 1 hour:{" "}
                <span className={css.priceAccent}>{price_per_hour}$</span>
              </li>
            </ul>
            <button type="button" className={css.heartBtn}>
              <Icon name="HeartNormal" className={css.iconHart} />
            </button>
          </div>
        </div>
        <ul className={css.detailsList}>
          <li className={css.detailsItem}>
            Age: <span className={css.ageAccent}>{age}</span>
          </li>
          <li className={css.detailsItem}>
            Experience: <span>{experience}</span>
          </li>
          <li className={css.detailsItem}>
            Kids Age: <span>{kids_age}</span>
          </li>
          <li className={css.detailsItem}>
            Characters:{" "}
            <span>
              {Array.isArray(characters) ? characters.join(", ") : "—"}
            </span>
          </li>
          <li className={css.detailsItem}>
            Education: <span>{education}</span>
          </li>
        </ul>
        <div>
          <p className={css.about}>{about}</p>

          {!showDetails && (
            <button onClick={handleReadMore} className={css.readMore}>
              Read more
            </button>
          )}
        </div>
        {showDetails && <DetailNannyData id={nanny.id} />}
      </div>
    </div>
  );
}
