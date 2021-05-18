import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import "stylesheets/application"
import "google_map"

Rails.start()
Turbolinks.start()
ActiveStorage.start()
