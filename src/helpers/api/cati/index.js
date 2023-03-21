import { endpoints } from "./endpoints";
import request from "@/helpers/request";

export function updateCreateFaq(data) {
  return new Promise((resolve, reject) => {
    request({
      url: endpoints.updateCreateFaq,
      method: "POST",
      data,
    })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}
export function deleteFaq(data) {
  return new Promise((resolve, reject) => {
    request({
      url: endpoints.deleteFaq,
      method: "POST",
      data,
    })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

export function updateCreateSpeech(data) {
  return new Promise((resolve, reject) => {
    request({
      url: endpoints.updateCreateSpeech,
      method: "POST",
      data,
    })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}
export function deleteSpeech(data) {
  return new Promise((resolve, reject) => {
    request({
      url: endpoints.deleteSpeech,
      method: "POST",
      data,
    })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

export function updateCreateVideoCategory(data) {
  return new Promise((resolve, reject) => {
    request({
      url: endpoints.updateCreateVideoCategory,
      method: "POST",
      data,
    })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}
export function deleteVideoCategory(data) {
  return new Promise((resolve, reject) => {
    request({
      url: endpoints.deleteVideoCategory,
      method: "POST",
      data,
    })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

export function updateCreateVideo(data) {
  return new Promise((resolve, reject) => {
    request({
      url: endpoints.updateCreateVideo,
      method: "POST",
      data,
    })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}
export function deleteVideo(data) {
  return new Promise((resolve, reject) => {
    request({
      url: endpoints.deleteVideo,
      method: "POST",
      data,
    })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}
export function addClientCall(data) {
  return new Promise((resolve, reject) => {
    request({
      url: endpoints.addClientCall,
      method: "POST",
      data,
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}