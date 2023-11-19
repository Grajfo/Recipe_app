import Veggie from "../components/veggie";
import Popular from "../components/popular";
import { motion } from "framer-motion";
import React from 'react'

function home() {
  return (
    <motion.div
    animate={{opacity:1}}
    initial={{opacity:0}}
    exit={{opacitiy:0}}
    transition={{duration:0.5}}
    >
        <Veggie/>
        <Popular/>
    </motion.div>
  )
}

export default home