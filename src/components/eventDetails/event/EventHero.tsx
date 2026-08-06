import heroImg from "../../../assets/images/eventsImages/Hero-img.svg";

interface EventHeroProps {
  image?: string;
  alt?: string;
}

const EventHero = ({ image, alt }: EventHeroProps) => {
  return (
    <div>
      <img
        src={image || heroImg}
        alt={alt ?? "Event"}
        className="w-full max-w-191 h-auto aspect-[191/109.5] rounded-[30px] object-cover"
      />
    </div>
  );
};

export default EventHero;
