import React from 'react'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { services } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';

const ServiceCard = ({ index, title, icon }) => {
  return (
    <Tilt className='xs:w-[250px] w-full'>
      <motion.div 
        variants={fadeIn('right', 'spring', 0.5 * index, 0.75)}
        className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card '
      >
        <div
          options={{    //Tilting of the cards options
            max: 45,
            scale: 1,
            speed: 450
          }}
          className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col '
        >
          <img src={icon} alt={title} className='w-16 h-16 object-contain' />

          <h3 className='text-white text-[20px] font-bold text-center'>
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  )
}

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>
          Introduction
        </p>

        <h2 className={styles.sectionHeadText}>
          Overview.
        </h2>
      </motion.div>

      <motion.p variants={fadeIn()} className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'>
      As a front-end developer, I craft engaging and intuitive digital experiences that captivate users and bring designs to life. Proficient in HTML, CSS, and JavaScript, I specialize in translating creative concepts into responsive, user-friendly interfaces. With a keen eye for design and a passion for staying at the forefront of web technologies, I strive to create visually appealing and seamlessly functional websites. Collaborating closely with designers and back-end developers, I ensure the harmonious fusion of aesthetics and performance. Explore my portfolio to witness my commitment to delivering cutting-edge and user-centric solutions in the ever-evolving landscape of front-end development.
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(About, 'about')