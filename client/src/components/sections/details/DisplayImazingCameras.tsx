import { CAMERA_DATA } from "../../../lib/staticData"
import { useState, type JSX } from "react"
import { AnimatePresence, motion } from "framer-motion"
import type { CameraInfo } from "../../../lib/type"
import CameraCard from "./CameraCard"
import CamerDetailsCard from "./CamerDetailsCard"
const DisplayImazingCameras = (): JSX.Element => {
    const [openCameraIndex, setOpenCameraIndex] = useState<number | null>(null);
    return (
        <div className="w-full mt-5 flex flex-col gap-10">
            {
                CAMERA_DATA.map((camera: CameraInfo, index: number) => (
                    <motion.div
                        layout
                        transition={{ layout: { duration: 0.4, type: "spring", bounce: 0.2 } }}
                        key={camera.name}
                    >
                        <AnimatePresence mode="wait">
                            {
                                openCameraIndex !== index ? (
                                    <motion.div
                                        key="collapsed"
                                        initial={{ opacity: 0, y: 3}}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -4 }}
                                        transition={{ duration: 0.20 }}
                                    >
                                        <CameraCard
                                            index={index}
                                            camera={camera}
                                            setOpenCameraIndex={setOpenCameraIndex}
                                        />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="expanded"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0,}}
                                        exit={{ opacity: 0, y: 10, }}
                                        transition={{ duration: 0.3, ease: "linear" }}
                                    >
                                        <CamerDetailsCard
                                            setOpenCameraIndex={setOpenCameraIndex}
                                            camera={camera}
                                        />
                                    </motion.div>
                                )}
                        </AnimatePresence>
                    </motion.div>

                ))
            }
        </div>
    )
}

export default DisplayImazingCameras