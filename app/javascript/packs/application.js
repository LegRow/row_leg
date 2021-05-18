import Rails from "@rails/ujs";
import Turbolinks from "turbolinks";
import * as ActiveStorage from "@rails/activestorage";
import "channels";

Rails.start();
Turbolinks.start();
ActiveStorage.start();

import "@fortawesome/fontawesome-free/css/all"
import "stylesheets/application";
import "../task/index";
