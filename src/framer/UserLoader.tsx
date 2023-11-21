import { Player } from '@lottiefiles/react-lottie-player';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import lottieData from '../assets/lottie/loading-dots.json';

export interface UserLoaderProps {
    children?: React.ReactNode;
    loading: boolean;
}



function UserLoader({ children, loading }: UserLoaderProps) {

    return (
        <AnimatePresence mode="wait">
            {loading ? (
                <motion.div
                    className="w-full h-full flex justify-center items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Player
                        src={lottieData}
                        style={{
                            width: "200px",
                            height: "200px",
                        }}
                        autoplay
                        loop
                    />
                </motion.div>
            ) : (
                <motion.div
                    className="w-full h-full flex items-stretch flex-col flex-nowrap"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default UserLoader;