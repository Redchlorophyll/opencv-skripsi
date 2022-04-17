import Home from "@/pages/home";
import CameraProto from "@/pages/camerav1";
import Camera from "@/pages/camera";
import MobileProto from "@/pages/mobileProto";

const routes = [
  { path: "/", component: Home },
  { path: "/cam", component: Camera },
  { path: "/cam-proto", component: CameraProto },
  { path: "/mobile-proto", component: MobileProto },
];

export default routes;
