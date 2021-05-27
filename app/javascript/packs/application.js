import Rails from "@rails/ujs";
import Turbolinks from "turbolinks";
import * as ActiveStorage from "@rails/activestorage";
import "channels";
import "stylesheets/application";
import "controllers";
import "@fortawesome/fontawesome-free/css/all";
import "../view-event/index";
import "packs/qrcode";
import "stylesheets/application"
import "packs/aboutus"
import "./message"
import "./partner"

Rails.start();
Turbolinks.start();
ActiveStorage.start();
