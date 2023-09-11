import { AvatarFormatType } from "@avatechai/avatars";
import { defaultAvatarLoaders } from "@avatechai/avatars/default-loaders";
import { useAvatar } from "@avatechai/avatars/react";
import { useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { SlDocs } from "react-icons/sl";

export default function App() {
  const audioContextRef = useRef<AudioContext>(new AudioContext());

  const [input, setInput] = useState("");

  const [audioSrc, setAudioSrc] = useState("");
  const [file, setFile] = useState<File>();

  const [avatarId, setAvatarId] = useState(
    "fb4051f8-5969-480f-b57b-fcfc66c5b6f6",
  );

  const {
    avatarDisplay,
    playAudioFromNode,
    playAudioFromSource,
    availableEmotions,
    setEmotion,
  } = useAvatar({
    // Avatar State
    avatarId: avatarId,
    // Loader + Plugins
    avatarLoaders: defaultAvatarLoaders,
    // Style Props
    style: { height: 400, width: 400 },
  });
  return (
    <div className="w-full h-full flex flex-col gap-6 justify-center items-center bg-white text-black">
      <div className="navbar !min-h-8 !h-8 px-12">
        <div className="flex-1 !h-8 ">
          <div className="px-4 font-semibold text-xl">Avatars demo</div>
        </div>
        <div className="flex-none gap-2">
          <a
            className="btn btn-ghost !flex !items-center normal-case btn-sm"
            href="https://docs.avatech.ai/guides/introduction"
            target="_blank"
          >
            <SlDocs />
            Docs
          </a>
          <a className="btn btn-square btn-ghost" href="https://github.com/avatechgg/avatars-react-vite-demo">
            <FaGithub size={32} />
          </a>
        </div>
      </div>
      <div className="flex justify-center w-full ">
        <form className="gap-4 flex">
          {/* <label className="flex items-center">Generation Model:</label>
          <select
            name="model"
            onChange={(e) => {
              setTypeInput(e.target.value as AvatarFormatType);
            }}
            className="bg-white rounded-md ring-[1px] ring-black"
          >
            <option value="live2d">V1</option>
            <option value="threejs">V3</option>
          </select> */}
          <label className="flex items-center">Avatar Id:</label>
          <input
            type="text"
            aria-label="avatar id"
            required
            style={{ outline: "none" }}
            className="px-2 py-1 ring-black bg-white rounded-md ring-[1px] w-96"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            placeholder={"avatar id"}
          />
          <button
            type="submit"
            className="btn btn-accent btn-sm"
            onClick={(e) => {
              e.preventDefault();
              setAvatarId(input);
            }}
          >
            update
          </button>
        </form>
      </div>
      {avatarDisplay}
      <div className="grid justify-items-stretch grid-cols-2 gap-24">
        <div className="flex flex-col items-center ring-[1px] ring-black p-4 rounded-lg gap-4 h-96">
          <div className="flex justify-center">Lip-sync</div>
          <form className="gap-8 flex items-center">
            <input
              type="text"
              aria-label="avatar id"
              required
              style={{ outline: "none" }}
              className="px-2 py-1 ring-black bg-white rounded-md ring-[1px] w-96"
              value={audioSrc}
              onChange={(e) => {
                setAudioSrc(e.target.value);
              }}
              placeholder={"audio source"}
            />
            <button
              type="submit"
              className="btn btn-outline btn-info btn-xs normal-case"
              onClick={(e) => {
                e.preventDefault();
                playAudioFromSource(audioSrc, audioContextRef.current);
              }}
            >
              Play audio from src
            </button>
          </form>
          <form className="gap-4 flex items-center w-full justify-between">
            <input
              type="file"
              className="w-96"
              onChange={(e) => {
                setFile(e.target.files![0]);
              }}
            ></input>
            <button
              type="submit"
              className="btn btn-outline btn-info btn-xs normal-case"
              onClick={async (e) => {
                e.preventDefault();
                const nf = await file!.arrayBuffer();

                const audioBuffer =
                  await audioContextRef.current.decodeAudioData(nf);
                const bs = audioContextRef.current.createBufferSource();
                bs.buffer = audioBuffer;

                playAudioFromNode(bs, audioContextRef.current);
              }}
            >
              Play audio from file
            </button>
          </form>
        </div>
        <div className="flex flex-col items-center ring-[1px] ring-black p-4 rounded-lg gap-4 h-96">
          <div>Expression</div>
          <div className="flex w-full gap-4 h-full">
            <div className="flex flex-col ring-[1px] ring-black rounded-md p-2 gap-2 items-center">
              Available expressions
              <div className="divider !m-0"></div>
              <div className="grid grid-rows-6 grid-flow-col gap-4">
                {availableEmotions?.map((val, index) => {
                  return (
                    <button
                      key={index}
                      className="btn btn-neutral btn-xs capitalize w-full"
                      onClick={() => {
                        setEmotion(val);
                      }}
                    >
                      {val}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col col-span-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
