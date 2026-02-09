import HomeIcon from "@mui/icons-material/Home";
import DehazeIcon from "@mui/icons-material/Dehaze";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import MailIcon from "@mui/icons-material/Mail";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Link from "next/link";
import { User } from "@supabase/supabase-js"
import AccountBoxIcon from '@mui/icons-material/AccountBox';

interface Props{
  user:User|null
}


const Footer = ({user}:Props) => {
  return (
    <div className="bg-black w-full rounded-t-xl lg:hidden fixed bottom-0 ">
      <div className="flex items-center py-6 gap-10 justify-around">
        <Link href={`/`}>
          <div className="hover:opacity-75">
            <HomeIcon className="text-white font-bold" style={{fontSize:"30px"}}/>
          </div>
        </Link>
        <Link href={`/Sidever/Sidepage/Servicepage`}>
          <div className="hover:opacity-75">
            <ViewCompactIcon className="text-white font-bold" style={{fontSize:"30px"}}/>
          </div>
        </Link>

        <Link href={`/Sidever/Sidepage/Contact`}>
          <div className="hover:opacity-75">
            <MailIcon className="text-white" style={{fontSize:"30px"}}/>
          </div>
        </Link>

        <Link href={`/settings/profile`}>
          <div className="hover:opacity-75">
            <AccountBoxIcon className="text-white" style={{fontSize:"30px"}}/>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
