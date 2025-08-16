// import {
//   CheckCircle,
//   Circle,
//   Github,
//   Globe,
//   LinkedinIcon,
//   User,
// } from "lucide-react";
// import React, { useState } from "react";
// import axios from "axios"; // Add axios for API calls
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProfileSetup = () => {
//   const navigate = useNavigate();
//   const { token } = useSelector((state) => state.auth);
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     avatar: "", // String for URL or empty
//     bio: "",
//     skills: [],
//     customSkill: "",
//     github: "",
//     linkedin: "",
//     website: "",
//   });

//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const steps = ["Basic Info", "Skills", "Social Links", "Review"];
//   const predefinedSkillsList = [
//     "JavaScript",
//     "TypeScript",
//     "React",
//     "Node.js",
//     "Python",
//     "Java",
//     "Go",
//     "Rust",
//     "Docker",
//     "Kubernetes",
//     "AWS",
//     "MongoDB",
//     "PostgreSQL",
//     "GraphQL",
//     "Next.js",
//     "Vue.js",
//   ];

//   const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length));
//   const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

//   const toggleSkill = (skill) => {
//     setFormData((prev) => ({
//       ...prev,
//       skills: prev.skills.includes(skill)
//         ? prev.skills.filter((s) => s !== skill)
//         : [...prev.skills, skill],
//     }));
//   };

//   const addCustomSkill = () => {
//     const skill = formData.customSkill.trim();
//     if (
//       skill &&
//       !formData.skills.some((s) => s.toLowerCase() === skill.toLowerCase())
//     ) {
//       setFormData((prev) => ({
//         ...prev,
//         skills: [...prev.skills, skill],
//         customSkill: "",
//       }));
//     }
//   };

//   const allSkills = [
//     ...predefinedSkillsList,
//     ...formData.skills.filter(
//       (s) =>
//         !predefinedSkillsList.some((ps) => ps.toLowerCase() === s.toLowerCase())
//     ),
//   ];

//   // Handle form submission
//   const handleSubmit = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_SERVER_URL}/api/create-profile`,
//         {
//           avatar: formData.avatar,
//           bio: formData.bio,
//           skills: JSON.stringify(formData.skills),
//           github: formData.github,
//           linkedin: formData.linkedin,
//           website: formData.website,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         }
//       );
//       navigate("/");
//       console.log("Profile saved:", response.data);
//       // Redirect or show success message
//     } catch (err) {
//       setError("Failed to save profile. Please try again.");
//       console.error("Error saving profile:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-black text-white flex justify-center items-center p-4">
//       <div className="w-full max-w-2xl">
//         {/* Progress bar */}
//         <div className="m-6 space-y-2 text-center">
//           <h1 className="text-4xl font-semibold">Complete Your Profile</h1>
//           <p className="text-lg font-semibold text-[#838383]">
//             Let's set up your developer profile in a few simple steps
//           </p>
//         </div>

//         <div className="mb-6 space-y-6">
//           <div className="w-full bg-[#3A3A3A] h-2 rounded-full mt-2">
//             <div
//               className="bg-white h-2 rounded-full transition-all duration-300"
//               style={{
//                 width: `${((step - 1) / (steps.length - 1)) * 100}%`,
//               }}
//             ></div>
//           </div>
//           <div className="flex justify-between text-sm">
//             {steps.map((s, i) => (
//               <span key={i} className="flex gap-2 justify-center text-center">
//                 {step > i + 1 ? (
//                   <CheckCircle size={18} className="text-green-400" />
//                 ) : step > i ? (
//                   <div className="bg-white rounded-full w-4 h-4" />
//                 ) : (
//                   ""
//                 )}
//                 {s}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Step container */}
//         <div className="bg-[#0A0A0A] border border-[#1f1e1e] p-6 rounded-lg shadow-lg">
//           {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//           {step === 1 && (
//             <div>
//               <h2 className="text-lg font-semibold mb-2">Basic Info</h2>
//               <p className="text-[#838383] mb-4">Tell us about yourself</p>
//               {/* Avatar input as text (URL) */}
//               <div className="flex flex-col items-center mb-6">
//                 <div className="w-24 h-24 rounded-full bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
//                   {formData.avatar ? (
//                     <img
//                       src={formData.avatar}
//                       alt="avatar"
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <span className="text-[#838383] text-sm">+</span>
//                   )}
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Enter avatar URL"
//                   value={formData.avatar}
//                   onChange={(e) =>
//                     setFormData({ ...formData, avatar: e.target.value })
//                   }
//                   className="mt-3 px-4 py-2 bg-[#1a1a1a] rounded text-sm w-full text-center"
//                 />
//               </div>
//               {/* Bio */}
//               <label className="block font-semibold mb-2">Bio</label>
//               <textarea
//                 value={formData.bio}
//                 onChange={(e) =>
//                   setFormData({ ...formData, bio: e.target.value })
//                 }
//                 placeholder="Tell us about yourself, your experience, and what you're passionate about..."
//                 maxLength={500}
//                 className="w-full bg-[#121212] p-3 rounded focus:outline-none focus:ring-2 focus:ring-white text-sm"
//               />
//               <div className="text-[#838383] text-xs mt-1">
//                 {formData.bio.length}/500 characters
//               </div>
//             </div>
//           )}

//           {step === 2 && (
//             <div className="space-y-4">
//               <h2 className="text-xl font-semibold mb-2">Skills</h2>
//               <p className="text-[#838383] text-sm mb-4">
//                 What technologies do you work with?
//               </p>
//               <h1 className="font-semibold text-sm">Popular Skills</h1>
//               <div className="flex flex-wrap gap-2 mb-4">
//                 {allSkills.map((skill) => (
//                   <button
//                     key={skill}
//                     onClick={() => toggleSkill(skill)}
//                     className={`px-3 py-1 rounded-full border text-sm ${
//                       formData.skills.includes(skill)
//                         ? "bg-white text-black border-white"
//                         : "bg-[#121212] border-gray-600"
//                     }`}
//                   >
//                     {skill}
//                   </button>
//                 ))}
//               </div>
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   value={formData.customSkill}
//                   onChange={(e) =>
//                     setFormData({ ...formData, customSkill: e.target.value })
//                   }
//                   onKeyDown={(e) => e.key === "Enter" && addCustomSkill()}
//                   placeholder="Enter a skill..."
//                   className="flex-1 bg-[#121212] p-2 rounded text-sm"
//                 />
//                 <button
//                   onClick={addCustomSkill}
//                   className="bg-white text-black px-3 rounded"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
//           )}

//           {step === 3 && (
//             <div className="space-y-4">
//               <h2 className="text-xl font-semibold mb-2">Social Links</h2>
//               <p className="text-[#838383] text-sm mb-4">
//                 Connect your profiles
//               </p>
//               <div className="items-center gap-2 mb-3 space-y-2">
//                 <span className="flex items-center text-sm gap-2">
//                   <Github size={18} />
//                   GitHub Profile
//                 </span>
//                 <input
//                   type="text"
//                   placeholder="https://github.com/yourusername"
//                   value={formData.github}
//                   onChange={(e) =>
//                     setFormData({ ...formData, github: e.target.value })
//                   }
//                   className="w-full bg-[#121212] font-semibold p-2 rounded text-sm"
//                 />
//               </div>
//               <div className="items-center gap-2 mb-3 space-y-2">
//                 <span className="flex items-center text-sm gap-2">
//                   <LinkedinIcon size={18} />
//                   LinkedIn Profile
//                 </span>
//                 <input
//                   type="text"
//                   placeholder="https://linkedin.com/in/yourusername"
//                   value={formData.linkedin}
//                   onChange={(e) =>
//                     setFormData({ ...formData, linkedin: e.target.value })
//                   }
//                   className="w-full bg-[#121212] font-semibold p-2 rounded text-sm"
//                 />
//               </div>
//               <div className="w-full items-center space-y-2">
//                 <span className="flex items-center text-sm gap-2">
//                   <Globe size={18} />
//                   Personal Website
//                 </span>
//                 <input
//                   type="text"
//                   placeholder="https://yourwebsite.com"
//                   value={formData.website}
//                   onChange={(e) =>
//                     setFormData({ ...formData, website: e.target.value })
//                   }
//                   className="w-full bg-[#121212] font-semibold p-2 rounded text-sm"
//                 />
//               </div>
//               <p className="text-[#838383] text-center text-sm py-4">
//                 These links will be displayed on your public profile and help
//                 other developers connect with you.
//               </p>
//             </div>
//           )}

//           {step === 4 && (
//             <div>
//               <h2 className="text-xl font-semibold mb-2">Review</h2>
//               <p className="text-[#838383] mb-4">
//                 Review and complete your profile
//               </p>
//               <div className="items-center gap-4 mb-4 p-6 space-y-4 rounded-lg border border-[#2d2d2d] pb-4">
//                 <span className="flex gap-2 mb-4">
//                   <User />
//                   Profile Preview
//                 </span>
//                 <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center overflow-hidden">
//                   {formData.avatar ? (
//                     <img
//                       src={formData.avatar}
//                       alt="avatar"
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <span className="text-sm text-[#000000]">No Avatar</span>
//                   )}
//                 </div>
//                 <div>
//                   <p className="font-semibold">{formData?.bio}</p>
//                 </div>
//                 {formData.skills && <p className="font-semibold">Skills</p>}
//                 <p className="text-gray-300 text-sm">
//                   {formData.skills.length > 0
//                     ? formData.skills.join(", ")
//                     : "No skills selected"}
//                 </p>
//                 {(formData.github || formData.linkedin || formData.website) && (
//                   <p className="font-semibold mt-3">Social Links</p>
//                 )}
//                 <ul className="text-gray-300 text-sm">
//                   {formData.github && <li>{formData.github}</li>}
//                   {formData.linkedin && <li>{formData.linkedin}</li>}
//                   {formData.website && <li>{formData.website}</li>}
//                 </ul>
//               </div>
//               <p className="text-[#838383] text-center text-sm py-4">
//                 This is how your profile will appear to other developers in the
//                 community.
//               </p>
//             </div>
//           )}
//           <div className="flex justify-between mt-4">
//             {step > 1 && (
//               <button
//                 onClick={prevStep}
//                 className="px-4 py-2 bg-[#121212] border border-[#202020] rounded text-sm"
//               >
//                 Previous
//               </button>
//             )}
//             {step < steps.length ? (
//               <button
//                 onClick={nextStep}
//                 className="ml-auto px-4 py-2 bg-white text-black rounded hover:bg-gray-200 text-sm"
//               >
//                 Next
//               </button>
//             ) : (
//               <button
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className={`ml-auto px-4 py-2 bg-white text-black rounded hover:bg-gray-200 text-sm ${
//                   loading ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//               >
//                 {loading ? "Saving..." : "Complete Profile"}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileSetup;
import { CheckCircle, Github, Globe, LinkedinIcon, User } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    avatar: "",
    bio: "",
    skills: [],
    customSkill: "",
    github: "",
    linkedin: "",
    website: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const steps = ["Basic Info", "Skills", "Social Links", "Review"];
  const predefinedSkillsList = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "Go",
    "Rust",
    "Docker",
    "Kubernetes",
    "AWS",
    "MongoDB",
    "PostgreSQL",
    "GraphQL",
    "Next.js",
    "Vue.js",
  ];

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const toggleSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const addCustomSkill = () => {
    const skill = formData.customSkill.trim();
    if (
      skill &&
      !formData.skills.some((s) => s.toLowerCase() === skill.toLowerCase())
    ) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
        customSkill: "",
      }));
    }
  };

  const allSkills = [
    ...predefinedSkillsList,
    ...formData.skills.filter(
      (s) =>
        !predefinedSkillsList.some((ps) => ps.toLowerCase() === s.toLowerCase())
    ),
  ];
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = new FormData();
      if (avatarFile) data.append("avatar", avatarFile);
      data.append("bio", formData.bio);
      data.append("skills", JSON.stringify(formData.skills));
      data.append("github", formData.github);
      data.append("linkedin", formData.linkedin);
      data.append("website", formData.website);

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/create-profile`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      navigate("/");
      console.log("Profile saved:", response.data);
    } catch (err) {
      setError("Failed to save profile. Please try again.");
      console.error("Error saving profile:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white flex justify-center items-center p-4">
      <div className="w-full max-w-2xl">
        <div className="m-6 space-y-2 text-center">
          <h1 className="text-4xl font-semibold">Complete Your Profile</h1>
          <p className="text-lg font-semibold text-[#838383]">
            Let's set up your developer profile in a few simple steps
          </p>
        </div>

        <div className="mb-6 space-y-6">
          <div className="w-full bg-[#3A3A3A] h-2 rounded-full mt-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((step - 1) / (steps.length - 1)) * 100}%`,
              }}
            ></div>
          </div>
          <div className="flex justify-between text-sm">
            {steps.map((s, i) => (
              <span key={i} className="flex gap-2 justify-center text-center">
                {step > i + 1 ? (
                  <CheckCircle size={18} className="text-green-400" />
                ) : step > i ? (
                  <div className="bg-white rounded-full w-4 h-4" />
                ) : (
                  ""
                )}
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-[#0A0A0A] border border-[#594d4d] p-6 rounded-lg shadow-lg">
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Basic Info</h2>
              <p className="text-[#838383] mb-4">Tell us about yourself</p>
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
                  {formData.avatar ? (
                    <img
                      src={formData.avatar}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-[#838383] text-sm">+</span>
                  )}
                </div>
                <label className="mt-3 cursor-pointer px-4 py-2 bg-[#4e4e4e] rounded text-sm hover:bg-[#1f1f1f]">
                  {avatarFile ? "Change Avatar" : "Upload Avatar"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              </div>
              <label className="block font-semibold mb-2">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                placeholder="Tell us about yourself, your experience, and what you're passionate about..."
                maxLength={500}
                className="w-full bg-[#121212] border p-3 rounded focus:outline-none focus:ring-2 focus:ring-white text-sm"
              />
              <div className="text-[#838383] text-xs mt-1">
                {formData.bio.length}/500 characters
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-2">Skills</h2>
              <p className="text-[#838383] text-sm mb-4">
                What technologies do you work with?
              </p>
              <h1 className="font-semibold text-sm">Popular Skills</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {allSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1 rounded-full border text-sm ${
                      formData.skills.includes(skill)
                        ? "bg-white text-black border-white"
                        : "bg-[#121212] border-gray-600"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
              <div className="flex border-[#594d4d] gap-2">
                <input
                  type="text"
                  value={formData.customSkill}
                  onChange={(e) =>
                    setFormData({ ...formData, customSkill: e.target.value })
                  }
                  onKeyDown={(e) => e.key === "Enter" && addCustomSkill()}
                  placeholder="Enter a skill..."
                  className="flex-1 bg-[#121212] border border-[#594d4d] p-2 rounded text-sm"
                />
                <button
                  onClick={addCustomSkill}
                  className="bg-white text-black px-3 rounded"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-2">Social Links</h2>
              <p className="text-[#838383] text-sm mb-4">
                Connect your profiles
              </p>
              <div className="items-center gap-2 mb-3 space-y-2">
                <span className="flex items-center text-sm gap-2">
                  <Github size={18} />
                  GitHub Profile
                </span>
                <input
                  type="text"
                  placeholder="https://github.com/yourusername"
                  value={formData.github}
                  onChange={(e) =>
                    setFormData({ ...formData, github: e.target.value })
                  }
                  className="w-full bg-[#121212] border border-[#594d4d] font-semibold p-2 rounded text-sm"
                />
              </div>
              <div className="items-center gap-2 mb-3 space-y-2">
                <span className="flex items-center text-sm gap-2">
                  <LinkedinIcon size={18} />
                  LinkedIn Profile
                </span>
                <input
                  type="text"
                  placeholder="https://linkedin.com/in/yourusername"
                  value={formData.linkedin}
                  onChange={(e) =>
                    setFormData({ ...formData, linkedin: e.target.value })
                  }
                  className="w-full bg-[#121212] border border-[#594d4d] font-semibold p-2 rounded text-sm"
                />
              </div>
              <div className="w-full items-center space-y-2">
                <span className="flex items-center text-sm gap-2">
                  <Globe size={18} />
                  Personal Website
                </span>
                <input
                  type="text"
                  placeholder="https://yourwebsite.com"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                  className="w-full bg-[#121212] border border-[#594d4d] font-semibold p-2 rounded text-sm"
                />
              </div>
              <p className="text-[#838383] text-center text-sm py-4">
                These links will be displayed on your public profile and help
                other developers connect with you.
              </p>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Review</h2>
              <p className="text-[#838383] mb-4">
                Review and complete your profile
              </p>
              <div className="items-center gap-4 mb-4 p-6 space-y-4 rounded-lg border border-[#2d2d2d] pb-4">
                <span className="flex gap-2 mb-4">
                  <User />
                  Profile Preview
                </span>
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center overflow-hidden">
                  {formData.avatar ? (
                    <img
                      src={formData.avatar}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm text-[#000000]">No Avatar</span>
                  )}
                </div>
                <div>
                  <p className="font-semibold">{formData?.bio}</p>
                </div>
                {formData.skills && <p className="font-semibold">Skills</p>}
                <p className="text-gray-300 text-sm">
                  {formData.skills.length > 0
                    ? formData.skills.join(", ")
                    : "No skills selected"}
                </p>
                {(formData.github || formData.linkedin || formData.website) && (
                  <p className="font-semibold mt-3">Social Links</p>
                )}
                <ul className="text-gray-300 text-sm">
                  {formData.github && <li>{formData.github}</li>}
                  {formData.linkedin && <li>{formData.linkedin}</li>}
                  {formData.website && <li>{formData.website}</li>}
                </ul>
              </div>
              <p className="text-[#838383] text-center text-sm py-4">
                This is how your profile will appear to other developers in the
                community.
              </p>
            </div>
          )}
          <div className="flex justify-between mt-4">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="px-4 py-2 bg-[#121212] border border-[#594d4d] rounded text-sm"
              >
                Previous
              </button>
            )}
            {step < steps.length ? (
              <button
                onClick={nextStep}
                className="ml-auto px-4 py-2 bg-white text-black rounded hover:bg-gray-200 text-sm"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`ml-auto px-4 py-2 bg-white text-black rounded hover:bg-gray-200 text-sm ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Saving..." : "Complete Profile"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
