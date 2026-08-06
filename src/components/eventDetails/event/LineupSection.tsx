import avatar1 from "../../../assets/images/eventsImages/avatar 1.svg";
import avatar2 from "../../../assets/images/eventsImages/avatar 2.svg";
import avatar3 from "../../../assets/images/eventsImages/avatar 3.svg";
import avatar4 from "../../../assets/images/eventsImages/avatar 4.svg";
import avatar5 from "../../../assets/images/eventsImages/avatar 5.svg";
import avatar6 from "../../../assets/images/eventsImages/avatar 6.svg";

interface Artist {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

const DEFAULT_ARTISTS: Artist[] = [
  {
    id: "1",
    name: "Prof AbdulRazzaq Alaro",
    role: "Headliner",
    avatar: avatar1,
  },
  { id: "2", name: "Kunle Anfield", role: "", avatar: avatar2 },
  { id: "3", name: "Kunle Anfield", role: "", avatar: avatar3 },
  { id: "4", name: "Kunle Anfield", role: "", avatar: avatar4 },
  { id: "5", name: "Cole Palm", role: "", avatar: avatar5 },
  { id: "6", name: "Kevin de Bruyne", role: "", avatar: avatar6 },
];

export interface LineupArtist {
  name: string;
  role: string;
  photo: string;
}

interface LineupSectionProps {
  speakers?: LineupArtist[];
}

const FALLBACK_AVATARS = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
];

const LineupSection = ({ speakers }: LineupSectionProps) => {
  const artists: Artist[] =
    speakers === undefined
      ? DEFAULT_ARTISTS
      : speakers.map((s, i) => ({
          id: `${s.name}-${i}`,
          name: s.name,
          role: s.role === "Speaker" ? "" : s.role,
          avatar: s.photo || FALLBACK_AVATARS[i % FALLBACK_AVATARS.length],
        }));

  if (artists.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-white text-xl font-semibold">Lineup</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="flex items-center gap-3 bg-[#0C0C0C] border border-[#262525] rounded-[30px] p-3"
          >
            <img
              src={artist.avatar}
              alt={artist.name}
              className="w-10 h-10 rounded-full object-cover bg-gray-600"
            />
            <div>
              <p className="text-white text-sm font-medium">{artist.name}</p>
              {artist.role && (
                <p className="text-gray-400 text-xs">{artist.role}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LineupSection;
