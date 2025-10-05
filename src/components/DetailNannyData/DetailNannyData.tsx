import { useNanny } from "../../hooks/useNanny";
import css from "./DetailNannyData.module.css";
import Icon from "../../shared/Icon";
import Button from "../common/Button/Button";
import { useState } from "react";
import Modal from "../common/Modal/Modal";
import AppointmentForm from "../AppointmentForm/AppointmentForm";

export default function DetailNannyData({ id }: { id: string }) {
  const { data: nanny, isLoading, isError } = useNanny(id);
  const [isModal, setIsModal] = useState(false);
  const appoimentContent = {
    title: "Make an appointment with a babysitter",
    description:
      "Arranging a meeting with a caregiver for your child is the first step to creating a safe and comfortable environment. Fill out the form below so we can match you with the perfect care partner.",
  };
  const handelOpen = () => setIsModal(true);
  const handleClose = () => setIsModal(false);
  if (isLoading) return <p>Loading...</p>;
  if (isError || !nanny) return <p>Something went wrong</p>;
  return (
    <>
      {nanny.reviews ? (
        <ul className={css.reviewList}>
          {Object.entries(nanny.reviews).map(([key, review]) => (
            <li key={key}>
              <div className={css.wrapperRew}>
                <div className={css.avatarCircle}>
                  {review.reviewer.charAt(0).toUpperCase()}
                </div>
                <div className={css.revNameWrapper}>
                  <p>{review.reviewer}</p>
                  <p className={css.revRating}>
                    <Icon name="star" className={css.icon} /> {review.rating}
                  </p>
                </div>
              </div>
              <p className={css.comment}>{review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet</p>
      )}
      <Button onClick={handelOpen}>Make an appointment</Button>
      {isModal && (
        <Modal
          onClose={handleClose}
          title={appoimentContent.title}
          description={appoimentContent.description}
        >
          <AppointmentForm
            onClose={handleClose}
            nanny={{
              name: nanny.name,
              avatar: nanny.avatar_url,
            }}
          />
        </Modal>
      )}
    </>
  );
}
