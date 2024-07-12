export interface AudioProps {
  title: string;
  audioUrl: string;
}

export interface AudioContextType {
  audio: AudioProps | undefined;
  setAudio: React.Dispatch<React.SetStateAction<AudioProps | undefined>>;
}

export interface ProfileCardProps {
  podcastData: string;
  imageUrl: string;
  userFirstName: string;
}