import Rails from "@rails/ujs";
import Turbolinks from "turbolinks";
import * as ActiveStorage from "@rails/activestorage";
import "channels";
import "stylesheets/application";
import "controllers";
import "@fortawesome/fontawesome-free/css/all";
import "../view-event/index";
import "packs/qrcode";
import "packs/aboutus";
import "./message";
import "./partner";

require.context("../images", true);

Rails.start();
Turbolinks.start();
ActiveStorage.start();
