import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import { VscSettingsGear, VscSignOut } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../common/ConfirmationModal";

function SideBar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);

  // console.log(confirmationModal);

  if (profileLoading || authLoading) {
    return <div className="mt-10 text-white font-4xl">Loading...</div>;
  }

  return (
    <div>
      <div
        className="hidden lg:flex flex-col min-w-[225px] border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)]
      bg-richblack-800 py-10"
      >
        <div className="flex flex-col gap-2 ">
          {sidebarLinks.map((link, i) => {
            if (link.type && user?.accountType !== link.type) return null;

            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            );
          })}
        </div>

        <div className="mx-auto h-[1px] mt-6 mb-6 w-10/12 bg-richblack-600"></div>

        <div className="flex flex-col">
          <SidebarLink
            link={{ name: "Settings", path: "dashboard/settings" }}
            iconName="VscSettingsGear"
          ></SidebarLink>

          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are You Sure ?",
                text2: "You Will be loggged out from your Account",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                // btn1Handler: () => console.log('btn clicked of logout'),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-8 py-2 text-sm font-medium text-richblack-300"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}

export default SideBar;
