"use client";

import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaBackward, FaForward, FaAngleLeft, FaBars, FaXmark } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';

const getCoverImage = (title: string, artist: string) => {
    const t = title.toLowerCase();
    const a = artist.toLowerCase();
    const basePath = "/images/music-covers/";
    if (t.includes("bhajan") || t.includes("ram") || t.includes("hanuman") || t.includes("shiva") || t.includes("krishna") || t.includes("om") || t.includes("keshavam") || t.includes("choppaiyan")) return basePath + "spiritual_cover.png";
    if (t.includes("lofi") || t.includes("reverb") || t.includes("chill") || t.includes("mashup") || t.includes("reverbed")) return basePath + "lofi_cover.png";
    if (a.includes("arijit") || a.includes("sanam") || a.includes("atif") || a.includes("jubin") || a.includes("papon") || a.includes("shreya") || t.includes("flute") || t.includes("acoustic")) return basePath + "acoustic_cover.png";
    return basePath + "pop_cover.png";
};

const songList = [
    { title: "Aap Ki Nazron Ne Samjha", artist: "SANAM", src: "/music/Aap Ki Nazron Ne Samjha - SANAM ( slowed _ reverbed )  _vibezzone(MP3_128K).mp3" },
    { title: "Aasman Ko Chukar Dekha", artist: "Lofi", src: "/music/Aasman Ko Chukar Dekha __ Lofi   Reverbed __ Lofi Version __ 8D ONOFF SONG(MP3_128K).mp3" },
    { title: "Achyutam Keshavam", artist: "Slowed & Reverb", src: "/music/Achyutam Keshavam - Slowed   Reverb And it_s Raining(MP3_128K).mp3" },
    { title: "Ae Dil Hai Mushkil", artist: "Arijit Singh", src: "/music/Ae Dil Hai Mushkil (Slowed   Reverb) _ Arijit Singh _ Bollywood Lofi Mix _ Extra Lofi Vibes(MP3_128K).mp3" },
    { title: "Akhar", artist: "Amrinder Gill", src: "/music/Akhar _ Slowdd Lofi Remake _ Amrinder Gill(MP3_128K).mp3" },
    { title: "Ami Je Tomar", artist: "Arijit Singh", src: "/music/Ami Je Tomar - Lofi (Slowed   Reverb) _ Arijit Singh_ Shreya Ghoshal _ SR Lofi(MP3_128K).mp3" },
    { title: "Atak Gaya", artist: "Arijit Singh", src: "/music/Atak Gaya - [Slowed Reverb] Arijit Singh_ Badhai Do _ Rajkumar Rao _ Atak Gya Hai _Text4Music Lofi(MP3_128K).mp3" },
    { title: "Aynaa", artist: "Tanveer Evan", src: "/music/Aynaa _ Lofi_Version _ Tanveer Evan(M4A_128K).m4a" },
    { title: "Baari", artist: "Bilal Saeed", src: "/music/Baari - bilal saeed (perfectly slowed)(MP3_128K).mp3" },
    { title: "Bada Dukh Dina", artist: "Ram Lakhan", src: "/music/Bada Dukh Dina with lyrics _बड़ा दुःख दीना गाने के बोल _Ram Lakhan_ Anil Kapoor_Jackie Shroff_Madhuri(MP3_128K).mp3" },
    { title: "Bajrang Baan", artist: "Lofi Bhajan", src: "/music/Bajrang Baan _ Slowed   Reverb _  Lofi Bhajan(MP3_128K).mp3" },
    { title: "Channa Mereya", artist: "Arijit Singh", src: "/music/Channa Mereya - Arijit Singh (slowed _ reverbed)(MP3_128K).mp3" },
    { title: "Clueless Love Mashup", artist: "Vinick", src: "/music/Clueless Love Mashup _ Vinick _ Kesariya _ Darasal _ Hawayein _ Brahmastra _ Bollywood Lofi Mashup(MP3_128K).mp3" },
    { title: "Daulat Shohrat", artist: "Lofi Trip", src: "/music/Daulat Shohrat (Lofi Trip)(M4A_128K).m4a" },
    { title: "Dekh Lena", artist: "Arijit Singh", src: "/music/Dekh Lena - Arijit Singh Song _ Slowed And Reverb Lofi Mix(MP3_128K).mp3" },
    { title: "Dekha Ek Khwab", artist: "Kishore Kumar", src: "/music/Dekha Ek Khwab - Kishore K_ Lata M _ 80_s Hits _ Slowed _ Reverb(MP3_128K).mp3" },
    { title: "Deva Deva", artist: "Arijit Singh", src: "/music/Deva Deva - Lofi (Slowed   Reverb) _ Arijit Singh_ Jonita Gandhi _ SR Lofi(MP3_128K).mp3" },
    { title: "Dil", artist: "Raghav Chaitanya", src: "/music/Dil (Slowed Reverb) _ Raghav Chaitanya _ Ek Villain Returns _ Kota Lofi(M4A_128K).m4a" },
    { title: "Dil Jaaniye", artist: "Jubin Nautiyal", src: "/music/Dil Jaaniye - Jubin Nautiyal _ Slowed Reverb _ Invisible Music(M4A_128K).m4a" },
    { title: "Dil Ka Rishta", artist: "Dil Ka Rishta", src: "/music/Dil Ka Rishta Full Video - Dil Ka Rishta _ Arjun_ Aishwarya _ Priyanshu _ Alka_ Udit _ Kumar Sanu(MP3_128K).mp3" },
    { title: "Dil Ke Paas", artist: "Arijit Singh", src: "/music/Dil Ke Paas [Slowed Reverb] - Arijit Singh_ Tulsi Kumar _ Musiclovers _ Textaudio(MP3_128K).mp3" },
    { title: "Dil Mashup", artist: "Mahesh Suthar", src: "/music/Dil Mashup _ Heartbeat Chillout Mix _ Raghav Chaitanya_Arijit Singh_Darshan Raval _ Mahesh Suthar(MP3_128K).mp3" },
    { title: "Ehsaan Tera Hoga Mujhpar", artist: "Arijit Singh", src: "/music/Ehsaan Tera Hoga Mujhpar (LoFi Version By _Knockwell) _ Arijit Singh _ Lyrical Video _ LoFi Maharaja(MP3_128K).mp3" },
    { title: "Ek Pyar Ka Nagma Hai", artist: "Lofi", src: "/music/Ek Pyar Ka Nagma Hai - Lofi(MP3_128K).mp3" },
    { title: "Feel The Love Mashup", artist: "Sid Guldekar", src: "/music/Feel The Love Mashup _ Sid Guldekar _ Atif Aslam _ Tera Hua _ Jhoom _ Itni Si Baat _ Bollywood LoFi(MP3_128K).mp3" },
    { title: "Ishq Risk (Flute)", artist: "Vinaj Pro", src: "/music/Flute Cover _ Ishq Risk _ Mere Brother Ki Dulhaniya _ Instrumental _ Vinaj Pro Music(MP3_128K).mp3" },
    { title: "Moh Moh Ke Dhaage (Flute)", artist: "Vijay Tambe", src: "/music/Flute Version _ Moh Moh Ke Dhaage _ Dum Laga Ke Haisha _ Anu Malik _ Varun Grover _ Vijay Tambe(MP3_128K).mp3" },
    { title: "Dil Diyan Gallan (Flute)", artist: "Vijay Tambe", src: "/music/Flute Version_ Dil Diyan Gallan _ Tiger Zinda Hai _ Vishal and Shekhar _ Irshad Kamil _ Vijay Tambe(M4A_128K).m4a" },
    { title: "Rang Tune Prem Ka", artist: "Lofi Bhajan", src: "/music/Full Song - Rang Tune Prem Ka - Lofi Bhajan - रंग तूने प्रेम का जो मुझपे चढ़या है - Slowed _ Reverb(M4A_128K).m4a" },
    { title: "Gali mein aaj chand nikla", artist: "Alka Yagnik", src: "/music/Gali mein aaj chand nikla (slowed _ reverbed) Alka yagnik(MP3_128K).mp3" },
    { title: "Gerua", artist: "Arijit Singh", src: "/music/Gerua [Slowed Reverb] Song Lyrics _ Arijit Singh_ Antara Mitra(M4A_128K).m4a" },
    { title: "Hey Ram", artist: "Lofi", src: "/music/Hey Ram in Lofi Version _ Slowed and Reverb _ Devotional Songs _ Bhajan _(M4A_128K).m4a" },
    { title: "Hothon Se Chhu Lo Tum", artist: "Unwind", src: "/music/Hothon Se Chhu Lo Tum (Unwind Instrumental)(MP3_128K).mp3" },
    { title: "Humko Pyaar Hua", artist: "Bastareverbs", src: "/music/Humko Pyaar Hua [slowed reverb] - _Bastareverbs_(MP3_128K).mp3" },
    { title: "Jalte Diye", artist: "Hindi Lofi", src: "/music/JALTE DIYE [ slowed - reverb ] Hindi  lofi song(M4A_128K).m4a" },
    { title: "Jaan Ban Gaye", artist: "Vishal Mishra", src: "/music/Jaan Ban Gaye - Vishal Mishra Song _ Slowed And Reverb Lofi Mix(MP3_128K).mp3" },
    { title: "Jaanewale o Jaanewale", artist: "Heena", src: "/music/Jaanewale o Jaanewale (Heena) Audio songs _ Lofi Mixx Slowed reverb _ Ramswaroop Chouhan(MP3_128K).mp3" },
    { title: "Jagjit Singh Mashup", artist: "Jagjit Singh", src: "/music/Jagjit Singh _ Hare Krishna Hare Rama _ Keshwa Madhwa _ Om Namo Bhagavate _ Shri Krishna _ Ram Dhun(MP3_70K).mp3" },
    { title: "Jhoom x Kesariya", artist: "Ali Zafar & Arijit Singh", src: "/music/Jhoom x Kesariya (ACV Mashup) _ Brahmastra _ Ranbir Kapoor_ Alia Bhatt _ Arijit Singh_ Ali Zafar(MP3_128K).mp3" },
    { title: "Kaun Disa Me Leke", artist: "Slowed Melody", src: "/music/Kaun Disa Me Leke - Slowed   Melody(M4A_128K).m4a" },
    { title: "Kesariya Tera Ishq", artist: "Arijit Singh", src: "/music/Kesariya Tera Ishq - Lofi - Slowed And Reverb - Brahmastra _ Arijit Singh _ Lofi Songs _ Indian Lofi(MP3_128K).mp3" },
    { title: "Khamoshiyan", artist: "Arijit Singh", src: "/music/Khamoshiyan [Slowed Reverb] - Arijit Singh _ Music lovers _ Textaudio(M4A_128K).m4a" },
    { title: "Ki Honda Pyaar", artist: "Arijit Singh", src: "/music/Ki Honda Pyaar - Arijit Singh Jabariya Jodi Song _ Slowed and Reverb Lofi Mix(MP3_128K).mp3" },
    { title: "Kooch Na Karin", artist: "Azhar Abbas", src: "/music/Kooch Na Karin - Full Video _ Load Wedding _ Fahad Mustafa _ Mehwish Hayat _ Azhar Abbas(MP3_128K).mp3" },
    { title: "Kooch Na Karin (Lofi)", artist: "Load Wedding", src: "/music/Kooch Na Karin - Load Wedding [ Slowed _ Reverbed ] __ SLOWED LO-FI(MP3_128K).mp3" },
    { title: "Kyon", artist: "B Praak", src: "/music/Kyon-Official lyrical Video _Lo-fi_B Praak _ Payal Dev_ Kunaal Vermaa_ Aditya Dev_ Latest Sad Song(M4A_128K).m4a" },
    { title: "Lag Ja Gale", artist: "Sanam", src: "/music/Lag Ja Gale - Sanam _ Slowed Reverb _ Midnight Chill(MP3_128K).mp3" },
    { title: "Lag Jaa Gale (Arijit)", artist: "Arijit Singh", src: "/music/Lag Jaa Gale [ Slowed   Reverb ] _  Arijit Singh _ LoFi _ Slow Version _ 3AM-Music _ Bass Boosted(M4A_128K).m4a" },
    { title: "Love Mixtape", artist: "Sky The Sangeetkar", src: "/music/Love Mixtape (Mashup Lofi) SKY THE SANGEETKAR(MP3_128K).mp3" },
    { title: "MS Dhoni Theme", artist: "Dhaval K Raval", src: "/music/MS DHONI EMOTIONAL BACKGROUND MUSIC _ SAD MUSIC _ Dhaval K Raval(M4A_128K).m4a" },
    { title: "Main Rang Sharbaton Ka", artist: "Arijit Singh", src: "/music/Main Rang Sharbaton Ka [Slowed Reverb] - Arijit Singh _ Slowed and Reverb Song _ JD Lofi Music(MP3_128K).mp3" },
    { title: "Mast Magan", artist: "Arijit Singh", src: "/music/Mast Magan [Slowed Reverb] _ Arijit Singh _ Lofi _ Textaudio(MP3_128K).mp3" },
    { title: "Mera Aapki Kripa se", artist: "Lofi Bhajan", src: "/music/Mera Aapki Kripa se _ Slowed   Reverb _ Lofi Bhajan(M4A_128K).m4a" },
    { title: "Mere Dholna", artist: "Arijit Singh", src: "/music/Mere Dholna - Lofi (Slowed   Reverb) _ Arijit Singh _ SR Lofi(MP3_128K).mp3" },
    { title: "Mere Ghar Ram Aaye Hain", artist: "Jubin Nautiyal", src: "/music/Mere Ghar Ram Aaye Hain ( Slowed   Reverb ) _ Jubin Nautiyal _ Lofi Heaven(M4A_128K).m4a" },
    { title: "Mere Humsafar", artist: "Amanat Ali", src: "/music/Mere Humsafar Ost__ Amanat Ali__Ft.Slowed and Reverb(MP3_128K).mp3" },
    { title: "Moh Moh Ke Dhaage", artist: "Papon", src: "/music/Moh Moh Ke Dhaage - Papon [WORMONO Lofi Remake] _ Dum Laga Ke Haisha _ Bollywood Lofi(MP3_128K).mp3" },
    { title: "O Saathi", artist: "Atif Aslam", src: "/music/O Saathi [Slowed Reverb]Lyrics - AtifAslam __ Musiclovers __ Textaudio(M4A_128K).m4a" },
    { title: "Om Namah Shivay", artist: "Hemant Chauhan", src: "/music/Om Namah Shivay Dhoon _ Om Namah Shivaya Mantra _ Hemant Chauhan _ Shivaya(MP3_128K).mp3" },
    { title: "Pata Nahi Kis Roop Mein", artist: "Cover", src: "/music/Pata Nahi Kis Roop Mein Aakar Narayan Mil Jayega (Slowed _ Reverb) (Cover)(M4A_128K).m4a" },
    { title: "Patna Se Chalata Dawaiya", artist: "Bhojpuri Lofi", src: "/music/Patna Se Chalata Dawaiya (Slowed_Reverb) Song __ Lo-fi Bhojpuri Song __ Line MixMax(M4A_128K).m4a" },
    { title: "Pehli Nazar Mein", artist: "Atif Aslam", src: "/music/Pehli Nazar Mein [Slow   Reverb] - Atif Aslam _ Music lovers _ Textaudio(MP3_128K).mp3" },
    { title: "Piku Theme", artist: "Slide Guitar", src: "/music/Piku Theme (Slide Guitar Version)(MP3_128K).mp3" },
    { title: "Play Date", artist: "Lofi", src: "/music/Play Date (Lofi)(M4A_128K).m4a" },
    { title: "Raabta", artist: "Slowed Reverb", src: "/music/RAABTA (slowed reverb)(MP3_128K).mp3" },
    { title: "Rabb Wangu", artist: "Jass Manak", src: "/music/RABB WANGU [Slowed   Reverb] - JASS MANAK _ Punjabi Song _ chillwithbeats _ Textaudio(MP3_128K).mp3" },
    { title: "Rabb Manneya", artist: "Lakhwinder Wadali", src: "/music/Rabb Manneya [Slowed Reverb] Koi Jaane Na_  Lofi Mix - Lakhwinder Wadali _ Neeti Mohan - RaMe Music(M4A_128K).m4a" },
    { title: "Raghupati Raghav Raja Ram", artist: "Slowed Lofi", src: "/music/Raghupati Raghav Raja Ram - Slowed   Lofi(M4A_128K).m4a" },
    { title: "Sab Tera", artist: "Lofi", src: "/music/SAB TERA Lofi [Slowed And Reverb] _ Slow Version _ Slowed And Reverb Song _ Lofi Song _ Lofi_s Slot(MP3_128K).mp3" },
    { title: "Sapna Jahan", artist: "Slowed Reverb", src: "/music/Sapna Jahan [slowed   reverb] • ------------------ ------ ------------------(MP3_128K).mp3" },
    { title: "Shendur Laal Chadhayo", artist: "Slowed", src: "/music/Shendur Laal Chadhayo _ Slow and Reverb(MP3_128K).mp3" },
    { title: "Shiva Rudrashtkam", artist: "Slowed Reverb", src: "/music/Shiva Rudrashtkam Stotram-Namami Shamishan Nirvan Roopam (Slowed Reverb)(MP3_128K).mp3" },
    { title: "Shree Ram Jaanki", artist: "Slowed Reverb", src: "/music/Shree Ram Jaanki Baithe Hai Mere Seene Main - (Slowed and Reverb)(MP3_128K).mp3" },
    { title: "Shree Ram Janki (Lofi)", artist: "Lofi Song", src: "/music/Shree Ram Janki Baithe Hai Mere Seene Mein __ Slowed Reverb __ Lofi Song(M4A_128K).m4a" },
    { title: "Shri Krishna Govind", artist: "Jagjit Singh", src: "/music/Shri Krishna Govind Hare Murari (slowed and reverb) _lofi mix _Jagjit Singh(M4A_128K).m4a" },
    { title: "Sidhh Chopaiyan", artist: "Suresh Wadekar", src: "/music/Sidhh Chopaiyan __ Ramayan--__ slowed   reverb   lofi __ suresh wadekar(MP3_128K).mp3" },
    { title: "Soch Na Sake", artist: "Arijit Singh", src: "/music/Soch Na Sake - Arjit Singh (Slowed and Reverbed)(MP3_128K).mp3" },
    { title: "Soulful Love Mashup", artist: "Amtee", src: "/music/Soulful Love Mashup _ Jukebox _ Amtee _ Bollywood Lofi(MP3_128K).mp3" },
    { title: "Tum Jo Aaye", artist: "Rahat Fateh Ali Khan", src: "/music/TUM JO AAYE ( Slowed   reverb ) __ Rahat Fateh Ali Khan __ Tulsi Kumar __ EARGASM(MP3_128K).mp3" },
    { title: "Tabla", artist: "Khesari Lal Yadav", src: "/music/Tabla - Khesari Lal Yadav (Slowed   Reverb) _ New Bhojpuri Song _ LoFi Mix _ Abhi Music(M4A_128K).m4a" },
    { title: "Tera Ban Jaunga", artist: "Akhil Sachdeva", src: "/music/Tera Ban Jaunga Reprise - Akhil Sachdeva (Slowed Reverb Lofi) Song  _ Indian Lofi _ Lofi Mix(MP3_128K).mp3" },
    { title: "Tere Hawale", artist: "Arijit Singh", src: "/music/Tere Hawale [Slowed Reverb] - Arijit Singh_ Shilpa Rao _  Lal Singh Chaddha _ Lofi Music Channel(M4A_128K).m4a" },
    { title: "Tere Mast Mast Do Nain", artist: "Rahat Fateh Ali Khan", src: "/music/Tere Mast Mast Do Nain - [Slowed Reverb] Lofi _ Rahat Fateh Ali Khan _ Dabangg Textaudio _Text4Music(MP3_128K).mp3" },
    { title: "Teri Oree", artist: "Rahat Fateh Ali Khan", src: "/music/Teri Oree [Slow   Reverb] - Rahat Fateh Ali Khan_Shreya Ghoshal _ Music lovers _ Textaudio(MP3_128K).mp3" },
    { title: "Tu Hi Yaar Mera", artist: "Lofi", src: "/music/Tu Hi Yaar Mera LOFI(M4A_128K).m4a" },
    { title: "Tum Tak", artist: "Javed Ali", src: "/music/Tum Tak - Javed Ali (Gravero Lofi Remake) _ Raanjhanaa _ Bollywood Lofi(MP3_128K).mp3" },
    { title: "Tum Hi Ho", artist: "Arijit Singh", src: "/music/Tum hi ho[ Slowed Reverb] - Arijit Singh _ Musiclovers __ Textaudio(M4A_128K).m4a" },
    { title: "Udja kale kawan", artist: "Gadar", src: "/music/Udja kale kawan _ GADAR _ lofi _ [SLOWED_REVERBED] _ VICTORY_ _gadar _udjakalekawan _music _lofi(M4A_128K).m4a" },
    { title: "Zindagi Ki Na Toote Ladi", artist: "Lata Mangeshkar", src: "/music/Zindagi Ki Na Toote Ladi _ Full song _ Nitin Mukesh _ Lata Mangeshkar _ Kranti (1981)(MP3_128K).mp3" },
    { title: "Zindagi Pyar Ka Geet Hai", artist: "Lata Mangeshkar", src: "/music/Zindagi Pyar Ka Geet Hai Slowed Reverb Song _ Lata Mangeshkar _ Rajesh Khanna _ ----❣️(MP3_128K).mp3" },
    { title: "Zindagi ki na tute Ladi (Lofi)", artist: "Lata Mangeshkar", src: "/music/Zindagi ki na tute Ladi _ Lata Mangeshkar _ Lofi _ slowed and reverb _ Svibes(MP3_128K).mp3" },
    { title: "Chhalkat Hamro Jawanniya", artist: "Pawan Singh", src: "/music/_pawansingh _ Chhalkat Hamro Jawanniya Lofi Slowed  Reverbed_ छलकत हमरो जवनिया ए राजा__bhojpurilofi(M4A_128K).m4a" },
    { title: "Tum Tak Status", artist: "Status", src: "/music/tum tak whatsapp Status___ naino ki ghat leja naino ki naiya status(MP3_128K).mp3" },
    { title: "Aarambh Hai Prachand", artist: "Hindi Song", src: "/music/आरंभ है प्रचंड बोले मस्तको के झुंड _ Aarambh hai Prachand _ Full Song _ with हिन्दी_HINDI LYRICS(MP3_128K).mp3" },
    { title: "Tor Baurahawa Re Mai", artist: "Neelkamal Singh", src: "/music/तोर बउरहवा रे माई _ Neelkamal Singh _ Ft. Khesari Lal Yadav Bhojpuri Song _ माँ के ममता(M4A_128K).m4a" },
    { title: "Hanuman Ashtak", artist: "Lofi Bhajan", src: "/music/संकटमोचन हनुमान अष्टक _ Sankat Mochan Hanuman Ashtak (Slowed Reverb Lofi Bhajan Version)(MP3_128K).mp3" },
    { title: "Hanuman Chalisa", artist: "Lofi", src: "/music/हनुमान चालीसा __ Hanuman Chalisa __ slowed and Reverb __ lofi _hanumanchalisa _hanuman(MP3_128K).mp3" },
    { title: "Heri Sakhi Mangal Gao Ri", artist: "Kailash Kher", src: "/music/हेरी सखी मंगल गाओ री--महाशिवरात्रि special one -- bholenath songs I mahakal songs ft. kailash kher_jsm(MP3_128K).mp3" }
].map(s => ({ ...s, img: getCoverImage(s.title, s.artist) }));

const MusicPlayer: React.FC = () => {
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showPlaylist, setShowPlaylist] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const currentSong = songList[currentSongIndex];

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = currentSong.src;
            if (isPlaying) {
                audioRef.current.play().catch(e => console.error("Playback failed:", e));
            }
        }
    }, [currentSongIndex]);

    const playPause = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.error("Playback failed:", e));
        }
        setIsPlaying(!isPlaying);
    };

    const nextSong = () => {
        setCurrentSongIndex(prev => (prev + 1) % songList.length);
        setIsPlaying(true);
    };

    const prevSong = () => {
        setCurrentSongIndex(prev => (prev - 1 + songList.length) % songList.length);
        setIsPlaying(true);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setProgress(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            const time = parseFloat(e.target.value);
            audioRef.current.currentTime = time;
            setProgress(time);
        }
    };

    const handleSongEnd = () => {
        nextSong();
    };

    return (
        <section id="music-player" className="py-20 bg-black min-h-screen flex items-center justify-center">
            <div className="container mx-auto px-4 flex flex-col items-center">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-purple-600"
                >
                    My Favorites
                </motion.h2>

                <div className="relative w-full max-w-[400px] bg-white dark:bg-[#1a1a1a] p-8 rounded-[30px] shadow-2xl overflow-hidden">
                    <nav className="flex justify-between mb-8">
                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-[#f53192] cursor-pointer hover:bg-[#f53192] hover:text-white transition-all">
                            <FaAngleLeft />
                        </div>
                        <div
                            onClick={() => setShowPlaylist(true)}
                            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-[#f53192] cursor-pointer hover:bg-[#f53192] hover:text-white transition-all"
                        >
                            <FaBars />
                        </div>
                    </nav>

                    <div className="flex flex-col items-center">
                        <motion.div
                            key={currentSongIndex}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative"
                        >
                            <img
                                src={currentSong.img}
                                alt={currentSong.title}
                                className="w-52 h-52 rounded-full border-8 border-[#f53192] shadow-[0_10px_60px_rgba(245,49,146,0.3)] object-cover"
                            />
                        </motion.div>

                        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mt-6 mb-1 text-center">
                            {currentSong.title}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
                            {currentSong.artist}
                        </p>

                        <audio
                            ref={audioRef}
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedMetadata={handleLoadedMetadata}
                            onEnded={handleSongEnd}
                        />

                        <input
                            type="range"
                            value={progress}
                            max={duration || 0}
                            onChange={handleSeek}
                            className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#f53192] mb-8"
                        />

                        <div className="flex justify-center items-center gap-6">
                            <button
                                onClick={prevSong}
                                className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-[#f53192] hover:bg-[#f53192] hover:text-white transition-all transform active:scale-90"
                            >
                                <FaBackward />
                            </button>
                            <button
                                onClick={playPause}
                                className="w-16 h-16 rounded-full bg-[#f53192] flex items-center justify-center text-white shadow-lg hover:bg-[#d42a7e] transition-all transform active:scale-95"
                            >
                                {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} className="ml-1" />}
                            </button>
                            <button
                                onClick={nextSong}
                                className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-[#f53192] hover:bg-[#f53192] hover:text-white transition-all transform active:scale-90"
                            >
                                <FaForward />
                            </button>
                        </div>
                    </div>

                    <AnimatePresence>
                        {showPlaylist && (
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="absolute inset-0 bg-white dark:bg-[#1a1a1a] z-50 flex flex-col p-6"
                            >
                                <div className="flex justify-between items-center mb-6 pb-2 border-b dark:border-gray-800">
                                    <h3 className="text-xl font-bold dark:text-white">Playlist</h3>
                                    <FaXmark
                                        className="text-[#f53192] text-2xl cursor-pointer"
                                        onClick={() => setShowPlaylist(false)}
                                    />
                                </div>
                                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                    <ul className="space-y-1">
                                        {songList.map((song, index) => (
                                            <li
                                                key={index}
                                                onClick={() => {
                                                    setCurrentSongIndex(index);
                                                    setIsPlaying(true);
                                                    setShowPlaylist(false);
                                                }}
                                                className={`p-3 rounded-xl cursor-pointer transition-all flex items-center ${currentSongIndex === index
                                                        ? "bg-[#f53192] text-white"
                                                        : "hover:bg-pink-50 dark:hover:bg-gray-800 dark:text-gray-300"
                                                    }`}
                                            >
                                                <span className="text-sm">
                                                    {index + 1}. {song.title}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #f53192;
                    border-radius: 10px;
                }
            `}</style>
        </section>
    );
};

export default MusicPlayer;
