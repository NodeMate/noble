var util = require('util')
var events = require('events')
var bridge = require('@nodemate/bridge')

/**
 *  NobleBindings for NodeMate
 */
var NobleBindings = function() {
  var self = this
  bridge.on('message', function(message) {
    if (message.type === 'ble') {
      var payload = message.payload
      if (payload.type === 'emit') {
        var arguments = [payload.name, ...payload.arguments]
        self.emit.apply(self, arguments)
      }
    }
  })
};

util.inherits(NobleBindings, events.EventEmitter);

NobleBindings.prototype.sendMessage = function(name, arguments) {
  bridge.send({
    type: 'ble',
    payload: {
      name: name,
      arguments: arguments
    }
  })
}

var nobleBindings = new NobleBindings();
 
nobleBindings.init = function() {

};

nobleBindings.startScanning = function(serviceUuids, allowDuplicates) {
  this.sendMessage('startScanning', { serviceUUIDs: serviceUuids, allowDuplicates: allowDuplicates })
};

nobleBindings.stopScanning = function() {
  this.sendMessage('stopScanning', {})
};

nobleBindings.connect = function(deviceUuid) {
  this.sendMessage('connect', { peripheralUUID: deviceUuid })
};

nobleBindings.disconnect = function(deviceUuid) {
  this.sendMessage('disconnect', { peripheralUUID: deviceUuid })
};

nobleBindings.updateRssi = function(deviceUuid) {
  this.sendMessage('updateRSSI', { peripheralUUID: deviceUuid })
};

nobleBindings.discoverServices = function(deviceUuid, uuids) {
  this.sendMessage('discoverServices', { peripheralUUID: deviceUuid, uuids: uuids })
};

nobleBindings.discoverIncludedServices = function(deviceUuid, serviceUuid, serviceUuids) {
  this.sendMessage('discoverIncludedServices', { peripheralUUID: deviceUuid, serviceUUID: serviceUuid, serviceUUIDs: serviceUuids })
};

nobleBindings.discoverCharacteristics = function(deviceUuid, serviceUuid, characteristicUuids) {
  this.sendMessage('discoverCharacteristics', { peripheralUUID: deviceUuid, serviceUUID: serviceUuid, characteristicUUIDs: characteristicUuids })
};

nobleBindings.read = function(deviceUuid, serviceUuid, characteristicUuid) {
  this.sendMessage('read', { peripheralUUID: deviceUuid, serviceUUID: serviceUuid, characteristicUUID: characteristicUuid })
};

nobleBindings.write = function(deviceUuid, serviceUuid, characteristicUuid, data, withoutResponse) {
  this.sendMessage('write', { peripheralUUID: deviceUuid, serviceUUID: serviceUuid, characteristicUUID: characteristicUuid, data: data, withoutResponse: withoutResponse })
};

nobleBindings.broadcast = function(deviceUuid, serviceUuid, characteristicUuid, broadcast) {
  throw new Error('NodeMate (read iOS) does not support broadcast.');
};

nobleBindings.notify = function(deviceUuid, serviceUuid, characteristicUuid, notify) {
  this.sendMessage('notify', { peripheralUUID: deviceUuid, serviceUUID: serviceUuid, characteristicUUID: characteristicUuid, notify: notify })
};

nobleBindings.discoverDescriptors = function(deviceUuid, serviceUuid, characteristicUuid) {
  this.sendMessage('discoverDescriptors', { peripheralUUID: deviceUuid, serviceUUID: serviceUuid, characteristicUUID: characteristicUuid })
};

nobleBindings.readValue = function(deviceUuid, serviceUuid, characteristicUuid, descriptorUuid) {
  this.sendMessage('readValue', { peripheralUUID: deviceUuid, serviceUUID: serviceUuid, characteristicUUID: characteristicUuid, descriptorUUID: descriptorUuid })
};

nobleBindings.writeValue = function(deviceUuid, serviceUuid, characteristicUuid, descriptorUuid, data) {
  this.sendMessage('writeValue', { peripheralUUID: deviceUuid, serviceUUID: serviceUuid, characteristicUUID: characteristicUuid, descriptorUUID: descriptorUuid, data: data })
};

nobleBindings.readHandle = function(deviceUuid, handle) {
  this.sendMessage('readHandle', { peripheralUUID: deviceUuid, handle: handle })
};

nobleBindings.writeHandle = function(deviceUuid, handle, data, withoutResponse) {
  this.sendMessage('writeHandle', { peripheralUUID: deviceUuid, handle: handle, data: data, withoutResponse: withoutResponse })
};

// Exports
module.exports = nobleBindings;