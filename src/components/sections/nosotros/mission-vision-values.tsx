"use client"
import { motion } from "framer-motion"
import { Target, Eye, Heart, Star, Lightbulb, Users, Award, Globe } from "lucide-react"

interface MissionVisionValuesProps {
  countryName: string
  countryCode: string
}

export function MissionVisionValues({ countryName }: MissionVisionValuesProps) {
  const values = [
    {
      icon: <Star className="h-7 w-7" />,
      title: "Excelencia",
      description: "Mantenemos los más altos estándares de calidad en cada uno de nuestros programas formativos.",
      color: "from-[#b6d900] to-[#12a9be]",
      bgColor: "bg-[#b6d900]/10 dark:bg-[#b6d900]/20",
      iconColor: "text-[#0d617b] dark:text-[#b6d900]",
    },
    {
      icon: <Lightbulb className="h-7 w-7" />,
      title: "Innovación",
      description:
        "Integramos continuamente metodologías vanguardistas y herramientas tecnológicas para optimizar el aprendizaje.",
      color: "from-[#12a9be] to-[#b6d900]",
      bgColor: "bg-[#12a9be]/10 dark:bg-[#12a9be]/20",
      iconColor: "text-[#0d617b] dark:text-[#12a9be]",
    },
    {
      icon: <Users className="h-7 w-7" />,
      title: "Compromiso",
      description:
        "Nos enfocamos en el desarrollo profesional y personal de cada miembro de nuestra comunidad educativa.",
      color: "from-[#0d617b] to-[#12a9be]",
      bgColor: "bg-[#0d617b]/10 dark:bg-[#0d617b]/20",
      iconColor: "text-[#0d617b] dark:text-[#12a9be]",
    },
    {
      icon: <Award className="h-7 w-7" />,
      title: "Integridad",
      description: "Operamos con transparencia, ética y responsabilidad en cada una de nuestras actividades.",
      color: "from-[#12a9be] to-[#0d617b]",
      bgColor: "bg-[#12a9be]/10 dark:bg-[#12a9be]/20",
      iconColor: "text-[#0d617b] dark:text-[#12a9be]",
    },
    {
      icon: <Globe className="h-7 w-7" />,
      title: "Inclusión",
      description: "Fomentamos un entorno diverso e inclusivo donde cada persona puede alcanzar su máximo potencial.",
      color: "from-[#b6d900] to-[#0d617b]",
      bgColor: "bg-[#b6d900]/10 dark:bg-[#b6d900]/20",
      iconColor: "text-[#0d617b] dark:text-[#b6d900]",
    },
    {
      icon: <Heart className="h-7 w-7" />,
      title: "Impacto Social",
      description: "Contribuimos al progreso de la sociedad mediante la educación y el desarrollo de talento humano.",
      color: "from-[#0d617b] to-[#b6d900]",
      bgColor: "bg-[#0d617b]/10 dark:bg-[#0d617b]/20",
      iconColor: "text-[#0d617b] dark:text-[#12a9be]",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, rotateY: -90, scale: 0.8 },
    visible: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 80,
      },
    },
  }

  return (
    <motion.section
      className="py-24 md:py-32"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block mb-4"
              variants={itemVariants}
              whileHover={{ scale: 1.05, rotate: [0, -1, 1, 0] }}
            >
              <div className="bg-gradient-to-r from-[#0d617b] to-[#12a9be] text-white px-6 py-2 rounded-full text-sm font-semibold tracking-wide">
                NUESTRA ESENCIA
              </div>
            </motion.div>

            <motion.h2
              className="text-5xl md:text-7xl font-black bg-gradient-to-r from-gray-900 via-[#0d617b] to-[#12a9be] dark:from-white dark:via-[#12a9be] dark:to-[#b6d900] bg-clip-text text-transparent mb-6 leading-tight"
              variants={itemVariants}
            >
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Misión, Visión
              </motion.span>
              <br />
              <motion.span
                className="text-transparent bg-gradient-to-r from-[#0d617b] to-[#12a9be] bg-clip-text"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                y Principios
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Los cimientos fundamentales que orientan nuestra labor y expresan nuestro compromiso con la formación de
              excelencia en {countryName}.
            </motion.p>
          </motion.div>

          {/* Misión y Visión */}
          <motion.div
            className="grid lg:grid-cols-2 gap-12 mb-24"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Misión */}
            <motion.div className="relative group" variants={cardVariants} whileHover={{ y: -10, rotateY: 5 }}>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#0d617b] to-[#12a9be] rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              />
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-2xl">
                <motion.div
                  className="flex items-center mb-8"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="bg-gradient-to-r from-[#0d617b] to-[#12a9be] p-4 rounded-2xl mr-6 shadow-lg"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Target className="h-8 w-8 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Nuestra Misión</h3>
                    <motion.div
                      className="w-20 h-1 bg-gradient-to-r from-[#0d617b] to-[#12a9be] rounded-full mt-2"
                      initial={{ width: 0 }}
                      whileInView={{ width: 80 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
                <motion.p
                  className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  Brindar servicios educativos especializados a organizaciones y profesionales, destacando por la
                  calidad de nuestros facilitadores, el uso de tecnología avanzada y un equipo comprometido con una
                  formación de primer nivel.
                </motion.p>
              </div>
            </motion.div>

            {/* Visión */}
            <motion.div className="relative group" variants={cardVariants} whileHover={{ y: -10, rotateY: -5 }}>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#12a9be] to-[#b6d900] rounded-2xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-300"
                initial={{ scale: 0, rotate: 180 }}
                whileInView={{ scale: 1, rotate: -1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              />
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-2xl">
                <motion.div
                  className="flex items-center mb-8"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="bg-gradient-to-r from-[#12a9be] to-[#b6d900] p-4 rounded-2xl mr-6 shadow-lg"
                    whileHover={{ rotate: -360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Eye className="h-8 w-8 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Nuestra Visión</h3>
                    <motion.div
                      className="w-20 h-1 bg-gradient-to-r from-[#12a9be] to-[#b6d900] rounded-full mt-2"
                      initial={{ width: 0 }}
                      whileInView={{ width: 80 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
                <motion.p
                  className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  viewport={{ once: true }}
                >
                  Consolidarnos como una organización líder, innovadora y reconocida a nivel regional, estableciendo
                  nuevos estándares en capacitación, gestión del talento humano y servicios de consultoría de alta
                  calidad.
                </motion.p>
              </div>
            </motion.div>
          </motion.div>

          {/* Valores */}
          <motion.div>
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: -40, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
            >
              <motion.h3
                className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
                initial={{ opacity: 0, rotateX: -90 }}
                whileInView={{ opacity: 1, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Nuestros{" "}
                <span className="bg-gradient-to-r from-[#0d617b] to-[#12a9be] bg-clip-text text-transparent">
                  Principios
                </span>
              </motion.h3>
              <motion.div
                className="w-24 h-1 bg-gradient-to-r from-[#0d617b] to-[#12a9be] rounded-full mx-auto"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
              />
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  variants={{
                    hidden: { opacity: 0, y: 60, rotateX: -45, scale: 0.8 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      scale: 1,
                      transition: {
                        duration: 0.8,
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100,
                      },
                    },
                  }}
                  whileHover={{ y: -12, rotateY: 5, scale: 1.02 }}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${value.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                  />
                  <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300">
                    <motion.div
                      className="flex items-start mb-6"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        className={`${value.bgColor} p-4 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className={`${value.iconColor}`}>{value.icon}</div>
                      </motion.div>
                      <div className="flex-1">
                        <motion.h4
                          className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#0d617b] dark:group-hover:text-[#12a9be] transition-colors duration-300"
                          initial={{ opacity: 0, y: -10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          {value.title}
                        </motion.h4>
                        <motion.div
                          className={`w-12 h-0.5 bg-gradient-to-r ${value.color} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: 48 }}
                          transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </motion.div>
                    <motion.p
                      className="text-gray-600 dark:text-gray-300 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {value.description}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
